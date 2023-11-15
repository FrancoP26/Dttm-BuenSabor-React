import { Button, Form, FormLabel, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {toast} from 'react-toastify';
import { Cliente } from "../../types/Cliente";
import {ClienteService} from "../../services/ClienteService"


type ClienteModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    cli: Cliente;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClienteModal = ({show, onHide, title, cli, refreshData}: ClienteModalProps) => {

   const handleSaveUpdate = async (cli: Cliente) => {
    try{
        const isNew = cli.id === 0;
        if(isNew) {
            await ClienteService.createCliente(cli);
        } else {
            await ClienteService.updateCliente(cli.id, cli);
        }
        toast.success(isNew ? "Cliente Registrado" : "Datos del Cliente Actualizados", {
            position: "top-center",

        });
        onHide();
        refreshData(prevState => !prevState);
    } catch (error) {
        console.error(error);
        toast.error("ocurrio un error");
    }
   };
   
 

   
    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            username: Yup.string().required(`Usuario requerido`),
            password: Yup.string().required(`Contraseña requerida`),
            nombre: Yup.string().required(`Nombre requerido`),
            apellido: Yup.string().required(`Apellido requerido`),
            telefono: Yup.string().required(`Telefono requerido`),
            email: Yup.string().required(`Email requerido`),
        });
    };

    const formik = useFormik({
        initialValues: cli,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Cliente) => handleSaveUpdate(obj),
    });

    return(
      
        
            <>
            <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
        <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>          
                
                <Form onSubmit={formik.handleSubmit}>

                <Form.Group controlId="formUsuario">
                            <FormLabel>Usuario</FormLabel>
                            <Form.Control
                                name="username"
                                type="text"
                                value={formik.values.username || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.username && formik.touched.username)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formContraseña">
                            <FormLabel>Contraseña</FormLabel>
                            <Form.Control
                                name="password"
                                type="text"
                                value={formik.values.password || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.password && formik.touched.password)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                   

                        <Form.Group controlId="formNombre">
                            <FormLabel>Nombre</FormLabel>
                            <Form.Control
                                name="nombre"
                                type="text"
                                value={formik.values.nombre || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.nombre && formik.touched.nombre)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.nombre}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formApellido">
                            <FormLabel>Apellido</FormLabel>
                            <Form.Control
                                name="apellido"
                                type="text"
                                value={formik.values.apellido || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.apellido && formik.touched.apellido)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.apellido}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formTelefono">
                            <FormLabel>Telefono</FormLabel>
                            <Form.Control
                                name="telefono"
                                type="text"
                                value={formik.values.telefono || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.telefono && formik.touched.telefono)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.telefono}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <FormLabel>Email</FormLabel>
                            <Form.Control
                                name="email"
                                type="text"
                                value={formik.values.email || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.email && formik.touched.email)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.email}
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
   


export default ClienteModal;