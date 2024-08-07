import './App.css';
import CryptoDashboard from './Component/CryptoDashboard';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
 
  return (
    <div>
    <ToastContainer/>
     <CryptoDashboard/>
    </div>
  )
}
// name,id,image,symbol, current_price,total_volume
export default App;
