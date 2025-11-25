import { NotificationBell, Avatar } from '../atoms';
import { ProfileWidget,Breadcrumbs } from '../molecules';


export const Header = ({
  title,
  breadcrumbs = [],
  onNotificationClick,
  notificationCount = 0,
  adminName = 'Admin',
  adminEmail = 'admin@example.com',
  adminAvatar
}) => {
  return (
    <header className="border-b border-gray-200 px-8 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

        <div className="flex items-center gap-6">
          <NotificationBell
            count={notificationCount}
            onClick={onNotificationClick}
          />
          <ProfileWidget
            name={adminName}
            email={adminEmail}
            avatar={adminAvatar}
          />
        </div>
      </div>

      <Breadcrumbs items={breadcrumbs} />
    </header>
  );
};
