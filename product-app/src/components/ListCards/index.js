import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export default class ListCards extends Component {
    render() {
        if (this.props.cards === '') {
            return <div/>
        }

        if (this.props.cards === null) {
            return (
                <Typography variant="headline"
                            component="h2"
                            className='card-list-no-results'>
                    Error. Please try the search at another time
                </Typography>
            )
        }

        if (this.props.cards.length === 0) {
            return (
                <Typography variant="headline"
                            component="h2"
                            className='card-list-no-results'>
                    No Results Found
                </Typography>
            );
        }
        return (
            <div className='card-list'>
                <Grid container spacing={40}>
                    {this.props.cards.map((card, index) => (
                        <Grid key={index} item sm={6} md={4} lg={3}>
                            <Card className='card'>
                                <CardMedia
                                    className='card-media'
                                    image={card.largeImage}
                                    title={card.name}
                                />
                                <CardContent className='card-content'>
                                    <Typography gutterBottom variant="headline" component="h2">
                                        <div dangerouslySetInnerHTML={{__html: card.name}}/>
                                    </Typography>
                                    <Typography gutterBottom variant='caption' component="h6">
                                        Cost: ${parseFloat(Math.round(card.salePrice * 100) / 100).toFixed(2)}
                                    </Typography>
                                    <Typography gutterBottom variant='caption' component="h6">
                                        ID: <span dangerouslySetInnerHTML={{__html: card.itemId}}/>
                                    </Typography>
                                    <br/>
                                    <Typography>
                                        <div dangerouslySetInnerHTML={{__html: card.shortDescription}}/>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" href={card.productUrl} target='_blank'
                                            rel="noopener noreferrer">
                                        View
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        )
    }
}