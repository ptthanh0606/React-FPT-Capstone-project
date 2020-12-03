import React from 'react';

import { useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';

const Councils = () => {
  const setMeta = useSetRecoilState(metaAtom);

  React.useEffect(() => {
    setMeta({
      title: 'Dashboard',
      breadcrumb: [{ title: 'Dashboard', path: '/dashboard' }],
    });
  }, [setMeta]);

  return <>All councils</>;
};

export default React.memo(Councils);
