<?php

/*
 * This file is part of nomiscz/flarum-ext-auth-wechat.
 *
 * Copyright (c) 2020 NomisCZ.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace NomisCZ\WeChatAuth\Listeners;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\UserSerializer;
use Illuminate\Contracts\Events\Dispatcher;

class AddUserLoginProviderAttribute
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'serializing']);
    }
    /**
     * @param Serializing $event
     */
    public function serializing(Serializing $event)
    {
        if ($event->isSerializer(UserSerializer::class)) {

            $userLoginProviders = $event->model->loginProviders();
            $userLoginProvidersCount = $userLoginProviders->count();
            $userProvider = $userLoginProviders->where('provider', 'wechat')->first();

            $event->attributes['WeChatAuth'] = [
                'isLinked' => $userProvider !== null,
                'identifier' => null, // Hidden, don't expose this information
                'providersCount' => $userLoginProvidersCount,
            ];
        }
    }
}