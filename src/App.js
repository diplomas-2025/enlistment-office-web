import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import UserProfile from "./pages/UserProfileScreen";
import UserList from "./pages/UserListScreen";
import AccountForm from "./pages/AccountForm";
import WorkForm from "./pages/WorkForm";
import StudyPlanForn from "./pages/StudyPlanForn";
import PassportForm from "./pages/PassportForm";
import UserForm from "./pages/UserForm";
import SummonForm from "./pages/SummonForm";
import {AuthAPI} from "./api/api";


function App() {
  return (
      <BrowserRouter>
          <Routes>
              { localStorage.getItem('token') ?
                  <>
                      <Route path="/profile" element={<UserProfile/>}/>

                      { AuthAPI.is_admin() === 'true' &&
                          <>
                              <Route path="/summon" element={<SummonForm/>}/>
                              <Route path="/profile/account" element={<AccountForm/>}/>
                              <Route path="/profile/work" element={<WorkForm/>}/>
                              <Route path="/profile/study-plan" element={<StudyPlanForn/>}/>
                              <Route path="/profile/passport" element={<PassportForm/>}/>
                              <Route path="/user" element={<UserForm/>}/>
                              <Route path="/users" element={<UserList/>}/>
                              <Route path="*" element={<Navigate to="/users" />} />
                          </>
                      }

                      { AuthAPI.is_admin() === 'false' &&
                          <>
                              <Route path="*" element={<Navigate to="/profile" />} />
                          </>
                      }


                  </> :
                  <>
                      <Route path="/login" element={<LoginScreen/>}/>
                      <Route path="*" element={<Navigate to="/login" />} />
                  </>
              }
          </Routes>
      </BrowserRouter>
  );
}

export default App;
