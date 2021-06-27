<?php

/*
 * This file is part of nomiscz/flarum-ext-auth-wechat.
 *
 * Copyright (c) 2021 NomisCZ.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace NomisCZ\WeChatAuth\Http\Controllers;

use Exception;
use Flarum\Forum\Auth\Registration;
use Flarum\Forum\Auth\ResponseFactory;
use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;
use NomisCZ\OAuth2\Client\Provider\WeChat;
use NomisCZ\OAuth2\Client\Provider\WeChatResourceOwner;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\RedirectResponse;

class WeChatAuthController implements RequestHandlerInterface
{
    /**
     * @var ResponseFactory
     */
    protected $response;
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;
    /**
     * @var UrlGenerator
     */
    protected $url;
    /**
     * @param ResponseFactory $response
     * @param SettingsRepositoryInterface $settings
     * @param UrlGenerator $url
     */
    public function __construct(ResponseFactory $response, SettingsRepositoryInterface $settings, UrlGenerator $url)
    {
        $this->response = $response;
        $this->settings = $settings;
        $this->url = $url;
    }
    /**
     * @param Request $request
     * @return ResponseInterface
     * @throws Exception
     */
    public function handle(Request $request): ResponseInterface
    {
        $redirectUri = $this->url->to('forum')->route('auth.wechat');

        $provider = new WeChat([
            'appid' => $this->settings->get('flarum-ext-auth-wechat.app_id'),
            'secret' => $this->settings->get('flarum-ext-auth-wechat.app_secret'),
            'redirect_uri' => $redirectUri,
        ]);

        $session = $request->getAttribute('session');
        $queryParams = $request->getQueryParams();
        $code = array_get($queryParams, 'code');

        if (!$code) {

            $authUrl = $provider->getAuthorizationUrl();
            $session->put('oauth2state', $provider->getState());
            return new RedirectResponse($authUrl . '&display=popup');
        }

        $state = array_get($queryParams, 'state');

        if (!$state || $state !== $session->get('oauth2state')) {

            $session->remove('oauth2state');
            throw new Exception('Invalid state');
        }

        $token = $provider->getAccessToken('authorization_code', compact('code'));
        /** @var WeChatResourceOwner $user */
        $user = $provider->getResourceOwner($token);

        return $this->response->make(
            'wechat',
            $user->getId(),
            function (Registration $registration) use ($user) {
                $registration
                    ->suggestUsername($user->getNickname())
                    ->setPayload($user->toArray());

                if ($user->getHeadImgUrl()) {
                    $registration->provideAvatar($user->getHeadImgUrl());
                }
            }
        );
    }
}
