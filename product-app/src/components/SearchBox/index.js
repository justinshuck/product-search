import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search'
import Grid from "@material-ui/core/Grid/Grid";
import { getMatches } from "../../services/productService";

export default class SearchBox extends Component {
    state = {
        keyword: ''
    }

    handleChange = e => {
        this.setState({
            keyword: e.target.value
        });
    }

    submit = e => {
        e.preventDefault();
        console.log('Im in with' + this.state.keyword);
        getMatches(this.state.keyword).then(response => {
            console.log(':)')
            console.log(response)
            this.props.setProductMatches(response.data);
        }).catch(err => {
            console.error(err);
            this.props.setProductMatches(null);
        })
    }

    render() {
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper>
                            <div className='search-fields'>
                                <form onSubmit={this.submit}>
                                    <TextField
                                        InputProps={{
                                            classes: {
                                                input: {
                                                    fontSize: 50
                                                }
                                            }
                                        }}
                                        onChange={this.handleChange}
                                        className='search-text-field'/>
                                    <Button
                                        color='primary'
                                        type='submit'
                                        disabled={this.state.keyword === ''}
                                    >
                                        <Search/>
                                        Search
                                    </Button>
                                </form>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}