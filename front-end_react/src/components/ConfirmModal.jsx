import PropTypes from "prop-types";

export function ConfirmModal({isOpen,onClose,onConfirm,message,title}){
    if(!isOpen) return null;

    return(
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm  flex items-center justify-center z-50">
            <div className="bg-blue-100 rounded-xl p-6 w-full max-w-sm shadow-lg
            transform transition-all duration-300 ease-out scale-100 opacity-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">{title}</h2>
                <p className="text-sm text-gray-600 mb-6 text-center">{message}</p>
                <div className="flex gap-3">
                    <button className="w-full bg-gray-300 text-gray-800 p-2 rounded-lg hover:bg-gray-400 transition"
                     onClick={onClose}>Volver</button>
                    <button className="w-full text-white p-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
                    onClick={onConfirm}>Confirmar</button>
                </div>
            </div>
        </div>
    )

}


//quitar la advertencia de los props.
ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};