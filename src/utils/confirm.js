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
  const [isProcessing, setIsProcessing] = React.useState(false);

  const onConfirm = React.useCallback(() => {
    setIsProcessing(true);
    Promise.resolve(confirmData.onConfirm()).finally(() => {
      setConfirmData(data => ({
        ...data,
        show: false,
      }));
      setIsProcessing(false);
    });
  }, [confirmData, setConfirmData]);

  const onHide = React.useCallback(() => {
    Promise.resolve(confirmData.onHide()).finally(() => {
      setConfirmData(data => ({
        ...data,
        show: false,
      }));
    });
  }, [confirmData, setConfirmData]);

  return (
    <ConfirmRemoveModal
      isShowFlg={confirmData.show}
      title={confirmData.title}
      body={confirmData.body}
      onConfirm={onConfirm}
      onHide={onHide}
      isProcessing={isProcessing}
    />
  );
});

const useConfirm = function () {
  const setConfirmData = useSetRecoilState(confirmAtom);

  function confirm({
    title = '',
    body = '',
    onConfirm = function () {},
    onCancel = function () {},
  }) {
    return new Promise((res, rej) => {
      setConfirmData({
        show: true,
        title,
        body,
        onConfirm: function () {
          res();
          return onConfirm();
        },
        onHide: function () {
          rej();
          return onCancel();
        },
      });
    })
      .then(() => {})
      .catch(() => {});
  }

  return React.useCallback(confirm, []);
};

export default useConfirm;
