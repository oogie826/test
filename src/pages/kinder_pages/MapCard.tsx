import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '40%',
            height: '100vh',
        },
        content: {
            padding: 0
        }
    }),
);

export default function RecipeReviewCard({ title, subheader, reviews, inputReviews, children }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                title={title}
                subheader={subheader}
            />
            {children}
            <CardContent className={classes.content}>
                {inputReviews}
                <div className='kinder-review-container'>
                    <List>
                        {reviews}
                    </List>
                </div>
            </CardContent>
        </Card>
    );
}