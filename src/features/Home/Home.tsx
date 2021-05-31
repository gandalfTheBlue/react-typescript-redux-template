import './Home.scss';

import { selectUser } from '../../app/appSlice';
import { useAppSelector } from '../../app/hooks';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);

  return (
    <div>
      <div>
        {t('home.firstName')} {user?.firstName}
      </div>
      <div>
        {t('home.lastName')} {user?.lastName}
      </div>
    </div>
  );
}

export default Home;
