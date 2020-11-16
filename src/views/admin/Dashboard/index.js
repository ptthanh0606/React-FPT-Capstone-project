import React from 'react';
import { Dashboard } from '_metronic/_partials';

import { useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';

export default React.memo(function DashboardPage() {
  const setMeta = useSetRecoilState(metaAtom);

  React.useEffect(() => {
    setMeta({
      title: 'Dashboard',
      breadcrumb: [{ title: 'Dashboard', path: '/dashboard' }],
    });
  }, [setMeta]);

  return <Dashboard />;
});
