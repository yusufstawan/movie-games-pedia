import Cookies from 'js-cookie';
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { MovieGamesProvider } from '../Context/MovieGamesContext';
import LayoutComponent from '../Layout/LayoutComponent';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import Reset from '../Pages/Auth/Reset';
import DetailGames from '../Pages/Games/DetailGames';
import FormGames from '../Pages/Games/FormGames';
import Games from '../Pages/Games/Games';
import TableGames from '../Pages/Games/TableGames';
import Home from '../Pages/Home';
import DetailMovie from '../Pages/Movie/DetailMovie';
import FormMovie from '../Pages/Movie/FormMovie';
import Movie from '../Pages/Movie/Movie';
import TableMovie from '../Pages/Movie/TableMovie';

const Routes = () => {

    const LoginRoute = ({ ...props }) => {

        if (Cookies.get('token') === undefined) {
            return <Route {...props} />
        } else if (Cookies.get('token') !== undefined) {
            return <Redirect path='/' />
        }

    }

    const PrivateRoute = ({ ...props }) => {

        if (Cookies.get('token') !== undefined) {
            return <Route {...props} />
        } else if (Cookies.get('token') === undefined) {
            return <Redirect path='/login' />
        }

    }

    return (
        <>
            <BrowserRouter>
                <MovieGamesProvider>

                    <Switch>
                        <Route path={'/'} exact>
                            <LayoutComponent main content={<Home />} />
                        </Route>

                        <Route path={'/games'} exact>
                            <LayoutComponent main content={<Games />} />
                        </Route>

                        <Route path={'/movies'} exact>
                            <LayoutComponent main content={<Movie />} />
                        </Route>

                        <Route path={'/movies/detail/:slug'} exact>
                            <LayoutComponent main content={<DetailMovie />} />
                        </Route>

                        <Route path={'/games/detail/:slug'} exact>
                            <LayoutComponent main content={<DetailGames />} />
                        </Route>

                        {/* Login Route */}

                        <LoginRoute path={'/login'} exact>
                            <LayoutComponent login content={<Login />} />
                        </LoginRoute>

                        <LoginRoute path={'/register'} exact>
                            <LayoutComponent login content={<Register />} />
                        </LoginRoute>

                        {/* Private Route */}

                        <PrivateRoute path={'/dashboard/movies'} exact>
                            <LayoutComponent main content={<TableMovie />} />
                        </PrivateRoute>

                        <PrivateRoute path={'/dashboard/games'} exact>
                            <LayoutComponent main content={<TableGames />} />
                        </PrivateRoute>

                        <PrivateRoute path={'/dashboard/movies/create'} exact>
                            <LayoutComponent main content={<FormMovie />} />
                        </PrivateRoute>

                        <PrivateRoute path={'/dashboard/movies/edit/:slug'} exact>
                            <LayoutComponent main content={<FormMovie />} />
                        </PrivateRoute>

                        <PrivateRoute path={'/dashboard/games/create'} exact>
                            <LayoutComponent main content={<FormGames />} />
                        </PrivateRoute>

                        <PrivateRoute path={'/dashboard/games/edit/:slug'} exact>
                            <LayoutComponent main content={<FormGames />} />
                        </PrivateRoute>

                        <PrivateRoute path={'/reset'} exact>
                            <LayoutComponent main content={<Reset />} />
                        </PrivateRoute>
                    </Switch>

                </MovieGamesProvider>
            </BrowserRouter>
        </>
    )
};

export default Routes;
