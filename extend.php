<?php

/*
 * This file is part of nomiscz/flarum-ext-auth-wechat.
 *
 * Copyright (c) 2020 NomisCZ.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace NomisCZ\WeChatAuth;

use Flarum\Extend;
use NomisCZ\WeChatAuth\Http\Controllers\WeChatAuthController;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),
    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\Routes('forum'))
        ->get('/auth/wechat', 'auth.wechat', WeChatAuthController::class),
];
