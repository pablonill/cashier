import { HomePage } from './Pages/HomePage/HomePage';
import { Routes, Route } from "react-router-dom";
import store from './App/store';
import 'bootstrap/dist/css/bootstrap.css';
import { OperationPage } from './Pages/OperationPage/OperationPage';
import { PinPage } from './Pages/PinPage/PinPage';
import { BalancePage } from './Pages/BalancePage/BalancePage';
import { WithDrawalPage } from './Pages/WithdrawalPage/WithdrawalPage';
import { ReportPage } from './Pages/ReportPage/ReportPage';
import { ErrorPage } from './Pages/ErrorPage/ErrorPage';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className='row'>
        <div className='col-md-3'/>
        <div className='col-md-6'>
          <h1>Cashier</h1>
          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='pin' element={<PinPage/>}></Route>
            <Route path='operations' element={<OperationPage/>}></Route>
            <Route path='balance' element={<BalancePage/>}></Route>
            <Route path='withdrawal' element={<WithDrawalPage/>}></Route>
            <Route path='report' element={<ReportPage/>}/>
            <Route path='error' element={<ErrorPage/>}/>
          </Routes>
        </div>
        <div className='col-md-3'/>
      </div>
    </Provider>
  );
}

export default App;
