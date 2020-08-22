import React, {useState} from 'react'

const Modal = ({openButtonText, children, onModalSubmit}) => {
  const [isActive, setIsActive] = useState(false);


  const changeModalState = modalState => setIsActive(modalState);

  return (
    <div>
      <button
        type="button"
        onClick={() => changeModalState(true)}
        className="button is-medium is-info is-outlined"
        data-toggle="modal"
        data-target="#exampleModal">
        {openButtonText || 'Open'}
      </button>
      <div className={`modal ${isActive ? 'is-active' : ''}`}>
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Make a Deal</p>
            <button className="delete" aria-label="close" onClick={() => changeModalState(false)}/>
          </header>
          <section className="modal-card-body">
            {children}
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={() => onModalSubmit(() => changeModalState(false))}>Save changes</button>
            <button className="button" onClick={() => changeModalState(false)}>Cancel</button>
          </footer>
        </div>
      </div>
    </div>
  )
}


export default Modal