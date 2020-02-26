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

use Fig\Http\Message\StatusCodeInterface;
use NomisCZ\WeChatAuth\Flarum\Forum\Auth\NResponseFactory;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response\EmptyResponse;

class WeChatUnlinkController implements RequestHandlerInterface
{
    protected $response;

    public function __construct(NResponseFactory $response)
    {
        $this->response = $response;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = $request->getAttribute('actor');
        $actorLoginProviders = $actor->loginProviders()->where('provider', 'wechat')->first();

        if ($actorLoginProviders) {
            
            $actorLoginProviders->delete();
            return new EmptyResponse(StatusCodeInterface::STATUS_OK);
        }

        return new EmptyResponse(StatusCodeInterface::STATUS_BAD_REQUEST);
    }
}