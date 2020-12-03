import React from 'react';

import { useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';

const Council = () => {
  const setMeta = useSetRecoilState(metaAtom);

  React.useEffect(() => {
    setMeta({
      title: 'Dashboard',
      breadcrumb: [{ title: 'Dashboard', path: '/dashboard' }],
    });
  }, [setMeta]);

  return <>Council detail</>;
};

export default React.memo(Council);
