import React from 'react';
import ConfirmRemoveModal from 'components/ConfirmModal/ConfirmModal';

import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

const confirmAtom = atom({
  key: 'confirm',
  default: {
    title: 'Confirmation',
    body: '',
    show: false,
    onConfirm: () => {},
    onHide: () => {},
  },
});

export const Container = React.memo(function () {
  const confirmData = useRecoilValue(confirmAtom);
  const setConfirmData = useSetRecoilState(confirmAtom);

  const onConfirm = React.useCallback(() => {
    confirmData.onConfirm();
    setConfirmData(data => ({
      ...data,
      show: false,
    }));
  }, [confirmData, setConfirmData]);

  const onHide = React.useCallback(() => {
    confirmData.onHide();
    setConfirmData(data => ({
      ...data,
      show: false,
    }));
  }, [confirmData, setConfirmData]);

  return (
    <ConfirmRemoveModal
      isShowFlg={confirmData.show}
      title={confirmData.title}
      body={confirmData.body}
      onConfirm={onConfirm}
      onHide={onHide}
    />
  );
});

const useConfirm = function () {
  const setConfirmData = useSetRecoilState(confirmAtom);

  function confirm({ title, body }) {
    return new Promise((res, rej) => {
      setConfirmData({
        show: true,
        title,
        body,
        onConfirm: res,
        onHide: rej,
      });
    });
  }

  return React.useCallback(confirm, []);
};

export default useConfirm;
