import React, {Component} from 'react'
import AppBar from "@material-ui/core/AppBar/AppBar";
import MediaQuery from 'react-responsive';
import ToolBar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import ShoppingBasket from '@material-ui/icons/ShoppingBasket'

import ListCards from "../../components/ListCards";
import SearchBox from './../../components/SearchBox';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            matches: ''
        }
        this.setProductMatches = this.setProductMatches.bind(this);
    }

    setProductMatches(matches) {
        this.setState({matches})
    }

    render() {
        return (
            <div>
                <AppBar
                    position='absolute'
                    className='side-app-bar'>
                    <ToolBar>
                        <ShoppingBasket style={{paddingRight: '50px'}}/>
                        <Typography
                            variant='title'>
                            Product Search
                        </Typography>
                    </ToolBar>
                </AppBar>
                <MediaQuery query="(min-device-width: 1224px)">
                    <main className='main-content'>
                        <SearchBox setProductMatches={this.setProductMatches}/>
                        <ListCards cards={this.state.matches}/>
                    </main>
                </MediaQuery>
                <MediaQuery query="(max-device-width: 1224px)">
                    <Typography className='not-supported'
                        variant='subheading'
                        component='h4'>
                        Mobile view not supported
                    </Typography>
                </MediaQuery>
            </div>
        )
    }
}