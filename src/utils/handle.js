
import { useNavigate } from 'react-router-dom';
import { getEntity } from './requests';

export const handleChange = (e, setValue) => {
    setValue(e.target.value)
};

export const HandleRedirectMainStore = ( store_id ) => {

  // const navigate = useNavigate();
  alert(store_id)
  // navigate(`${store_id}`, { replace: true})
    // alert('cc')

    return store_id;
}

export const handleOrderDetails = async ({ id, setOpen, setOrdersDetails, setError }) => {
    setOpen(true);

    try {
      const response = await getEntity(`ordersDetails/display/${id}`);
      if (response.data.success === true) {
        setOrdersDetails(response.data.results);
      }
    } catch (err) {
      setError("Error retrieving details");
      console.error(err);
    }
};

export const handleClose = ( { setOpen } ) => {
    setOpen(false);
};

export  const handlePageChange = (event, newPage, setCurrentPage) => {
  setCurrentPage(newPage);
};