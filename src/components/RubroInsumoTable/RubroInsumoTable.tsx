import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { ModalType } from '../../types/ModalType';
import Loader from "../Loader/Loader";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import { RubroInsumo } from '../../types/RubroInsumo';
import { RubroService } from '../../services/RubroService';
import RubroModal from '../RubroModal/RubroModal';



const RubroInsumoTable = () => {

  const initializableNewRubro = (): RubroInsumo => {
      return {
        id: 0,
        
        denominacion: "",
        estadoRubro: "ACTIVO",
        tipoRubro: "INSUMO"
      };
  };

  const [rubro, setRubro] = useState<RubroInsumo>(initializableNewRubro);

  const [showModal, setShowModal] = useState(false);
  
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  
  const [title, setTitle] = useState("");
  
  const handleClick = (newTitle: string, rub: RubroInsumo, modal: ModalType) => {
      setTitle(newTitle);
      setModalType(modal);
      setRubro(rub);
      setShowModal(true);
  };

  

  const [rubros, setRubros] = useState<RubroInsumo[]>([]);

  const [istloading, setLoading] = useState(true);

  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
      const fetchProducts = async () =>{
          const rubros = await RubroService.getRubros();
          setRubros(rubros);
          setLoading(false);
      };

      fetchProducts();
  }, [refreshData]);

  console.log(JSON.stringify(rubros, null, 2));
  
  return(
    <>
      <Button onClick={() => handleClick("Nuevo rubro", initializableNewRubro(),
      ModalType.CREATE)}>Nuevo</Button>

      {istloading? <Loader/>: (
          <Table hover>
              <thead>
                  <tr>
                      <th> Id </th>
                      <th> Denominacion </th>
                      <th> Estado </th>
                      <th> Tipo </th>
                      <th> Editar </th>
                      <th> Borrar </th>
                  </tr>
              </thead>
              <tbody>
                  {rubros.map( rubro => (
                      <tr key={rubro.id}>
                          <td>{rubro.id}</td>
                          <td>{rubro.denominacion}</td>
                          <td>{rubro.estadoRubro}</td>
                          <td>{rubro.tipoRubro}</td>
                          <td><EditButton onClick={() => handleClick("Editar Rubro", rubro, ModalType.UPDATE)}/></td>
                          <td><DeleteButton onClick={() => handleClick("Borrar Rubro", rubro, ModalType.DELETE)}/></td>
                      </tr>
                  ))}
              </tbody>
              
          </Table>
      )}

        {showModal && (
                <RubroModal
                show={showModal}
                onHide={() => setShowModal(false)}
                title={title}
                modalType={modalType}
                rub={rubro}
                refreshData={setRefreshData}
                />
            )}  

    </>
  )
}

export default RubroInsumoTable;
