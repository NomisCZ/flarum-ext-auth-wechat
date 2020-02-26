<?php

/*
 * This file is part of nomiscz/flarum-ext-auth-wechat.
 *
 * Copyright (c) 2020 NomisCZ.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace NomisCZ\WeChatAuth\Api\Controllers;

use NomisCZ\OAuth2\Client\Provider\WeChat;
use NomisCZ\OAuth2\Client\Provider\WeChatResourceOwner;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response\HtmlResponse;
use Zend\Diactoros\Response\RedirectResponse;
use Flarum\User\LoginProvider;
use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;

class WeChatLinkController implements RequestHandlerInterface
{
    /**
     * @var LoginProvider
     */
    protected $loginProvider;
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;
    /**
     * @var UrlGenerator
     */
    protected $url;
    /**
     * @param LoginProvider $loginProvider
     * @param SettingsRepositoryInterface $settings
     * @param UrlGenerator $url
     */
    public function __construct(LoginProvider $loginProvider, SettingsRepositoryInterface $settings, UrlGenerator $url)
    {
        $this->loginProvider = $loginProvider;
        $this->settings = $settings;
        $this->url = $url;
    }
    /**
     * @param ServerRequestInterface $request
     * @return ResponseInterface
     * @throws Exception
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = $request->getAttribute('actor');
        $actorLoginProviders = $actor->loginProviders()->where('provider', 'wechat')->first();

        if ($actorLoginProviders) {
            return $this->makeResponse('already_linked');
        }

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
            return new RedirectResponse($authUrl.'&display=popup');
        }

        $state = array_get($queryParams, 'state');

        if (!$state || $state !== $session->get('oauth2state')) {

            $session->remove('oauth2state');
            throw new Exception('Invalid state');
        }

        $token = $provider->getAccessToken('authorization_code', compact('code'));
        /** @var WeChatResourceOwner $user */
        $user = $provider->getResourceOwner($token);

        if ($this->checkLoginProvider($user->getId())) {
            return $this->makeResponse('already_used');
        }

        $created = $actor->loginProviders()->create([
            'provider' => 'wechat',
            'identifier' => $user->getId()
        ]);

        return $this->makeResponse($created ? 'done' : 'error');
    }

    private function makeResponse($returnCode = 'done') : HtmlResponse
    {
        $content = "<script>window.close();window.opener.app.wechat.wechatLinkComplete('{$returnCode}');</script>";

        return new HtmlResponse($content);
    }

    private function checkLoginProvider($identifier) : bool
    {
        return $this->loginProvider->where([
            ['provider', 'wechat'],
            ['identifier', $identifier]
        ])->exists();
    }
}