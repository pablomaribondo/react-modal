import { FC, useState } from 'react';
import './App.css';

import Modal from './components/Modal';

const App: FC = () => {
  const [isModal1Opened, setIsModal1Opened] = useState(false);
  const [isModal2Opened, setIsModal2Opened] = useState(false);

  return (
    <>
      <header className="header">
        <h1>React Modal</h1>
      </header>
      <div className="container">
        <button
          type="button"
          className="btn"
          onClick={() => setIsModal1Opened(true)}
        >
          Open modal 1
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => setIsModal2Opened(true)}
        >
          Open modal 2
        </button>
      </div>

      {isModal1Opened && (
        <Modal
          showCloseButton
          title="modal 1 title"
          duration={500}
          onClose={() => setIsModal1Opened(false)}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
            aliquid inventore assumenda possimus aperiam repellat sed debitis,
            sint ducimus impedit asperiores nesciunt accusantium tempora eius
            omnis quia rerum incidunt reiciendis.
          </p>
        </Modal>
      )}

      {isModal2Opened && (
        <Modal
          title="modal 2 title"
          duration={400}
          onClose={() => setIsModal2Opened(false)}
        >
          <p>Lorem ipsum dolor sit amet.</p>
        </Modal>
      )}
    </>
  );
};

export default App;
