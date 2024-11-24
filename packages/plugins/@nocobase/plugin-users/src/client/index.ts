/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { AdminProvider, Plugin, SystemSettingsProvider } from '@nocobase/client';
import { tval } from '@nocobase/utils/client';
import { UsersManagement } from './UsersManagement';
import ACLPlugin from '@nocobase/plugin-acl/client';
import { RoleUsersManager } from './RoleUsersManager';
import { UsersProvider } from './UsersProvider';

class PluginUsersClient extends Plugin {
  async load() {
    console.log(this.app.providers);
    const providerIndex = this.app.providers.findIndex((provider) => provider[0] === SystemSettingsProvider);
    this.app.providers.splice(providerIndex + 1, 0, [UsersProvider, {}]);
    // this.app.addProvider(UsersProvider);
    this.app.pluginSettingsManager.add('users-permissions', {
      title: tval('Users & Permissions', { ns: 'users' }),
      icon: 'TeamOutlined',
    });
    this.app.pluginSettingsManager.add('users-permissions.users', {
      title: tval('Users'),
      icon: 'UserOutlined',
      Component: UsersManagement,
      aclSnippet: 'pm.users',
    });

    const acl = this.app.pm.get(ACLPlugin);
    acl.rolesManager.add('users', {
      title: tval('Users'),
      Component: RoleUsersManager,
    });
  }
}

export default PluginUsersClient;
