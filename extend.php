<?php

/*
 * This file is part of nomiscz/flarum-ext-auth-wechat.
 *
 * Copyright (c) 2021 NomisCZ.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace NomisCZ\WeChatAuth;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\Extend;
use NomisCZ\WeChatAuth\Http\Controllers\WeChatAuthController;
use NomisCZ\WeChatAuth\Api\Controllers\WeChatLinkController;
use NomisCZ\WeChatAuth\Api\Controllers\WeChatUnlinkController;
use FoF\Components\Extend\AddFofComponents;

return [
    new AddFofComponents(),

    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\Routes('forum'))
        ->get('/auth/wechat', 'auth.wechat', WeChatAuthController::class),

    (new Extend\Routes('api'))
        ->get('/auth/wechat/link', 'auth.wechat.api.link', WeChatLinkController::class)
        ->post('/auth/wechat/unlink', 'auth.wechat.api.unlink', WeChatUnlinkController::class),

    (new Extend\ApiSerializer(UserSerializer::class))
        ->attributes(function($serializer, $user, $attributes) {

            $loginProviders = $user->loginProviders();
            $steamProvider = $loginProviders->where('provider', 'wechat')->first();

            $attributes['WeChatAuth'] = [
                'isLinked' => $steamProvider !== null,
                'identifier' => null, // Hidden, don't expose this information
                'providersCount' => $loginProviders->count()
            ];

            return $attributes;
        }),
];
