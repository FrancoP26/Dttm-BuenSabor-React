import { Button, Form, FormLabel, Modal } from "react-bootstrap";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {toast} from 'react-toastify';
import { RubroInsumo } from "../../types/RubroInsumo";
import { ModalType } from "../../types/ModalType";
import { RubroService } from "../../services/RubroService";

type RubroModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    rub: RubroInsumo;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const RubroModal = ({show, onHide, title, modalType, rub, refreshData}: RubroModalProps) => {
    
    const handleSaveUpdate = async (rub: RubroInsumo) => {
    try{
        const isNew = rub.id === 0;
        if(isNew) {
            await RubroService.createRubro(rub);
        } else {
            await RubroService.updateRubro(rub.id, rub);
        }
        toast.success(isNew ? "Rubro Registrado" : "Datos del Rubro Actualizados", {
            position: "top-center",

        });
        onHide();
        refreshData(prevState => !prevState);
    } catch (error) {
        console.error(error);
        toast.error("ocurrio un error");
    }
   };
   
   const handleDelete = async () => {

        try {
            await RubroService.deleteRubro(rub.id);
            toast.success("Eliminado con exito", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error("ocurrio un error");

        }
   }

   
    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            denominacion: Yup.string().required(`Denominacion requerida`),
            estado: Yup.string().required(`Estado requerido`)
        });
    };

    const formik = useFormik({
        initialValues: rub,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: RubroInsumo) => handleSaveUpdate(obj)
    });
    
    return(
        <>
         {modalType === ModalType.DELETE? (
            <>
            <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>¿Estás seguro que deseas eliminar el rubro?
                    <br />
                    <strong>{rub.denominacion}</strong>
                </p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
            </Modal.Footer>
            </Modal>
            
            </>
         ) : (
            <>
            <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>          
                
                <Form onSubmit={formik.handleSubmit}>

                        

                        <Form.Group controlId="formDenominacion">
                            <FormLabel>Denominacion</FormLabel>
                            <Form.Control
                                name="denominacion"
                                type="text"
                                value={formik.values.denominacion || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.denominacion && formik.touched.denominacion)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.denominacion}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formEstado">
                            <FormLabel>Estado</FormLabel>
                            <Form.Control
                                name="estado"
                                type="text"
                                value={formik.values.estadoRubro || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.estadoRubro && formik.touched.estadoRubro)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.estadoRubro}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formTipo">
                            <FormLabel>Tipo</FormLabel>
                            <Form.Control
                                name="tipo"
                                type="text"
                                value={formik.values.tipoRubro || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.tipoRubro && formik.touched.tipoRubro)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.tipoRubro}
                            </Form.Control.Feedback>
                        </Form.Group>

                        
                        

                        <Modal.Footer className="mt-4">
                            <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                            <Button variant="primary" type="submit" disabled={!formik.isValid}>Guardar</Button>
                        </Modal.Footer>

                    </Form>
                </Modal.Body>
            </Modal>
            </>
         )}
        </>
    )
}

export default RubroModal