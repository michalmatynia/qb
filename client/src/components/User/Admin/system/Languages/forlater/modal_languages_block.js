import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popover from '@material-ui/core/Popover';


class ModalLanguagesBlock extends Component {

    state = {
        localStorage: {
            open: false
        }
    }

    componentDidMount() {


    }



    // renderList = () => (
    //     this.props.list ?
    //         this.props.list.map((item) => (
    //             <ListItem key={item._id} dense button onClick={this.handleToggle(item._id)} style={{ padding: '10px 0' }}>
    //                 <ListItemIcon>
    //                     <Checkbox
    //                         edge="start"
    //                         onChange={this.handleToggle(item._id)}
    //                         checked={this.state.localStorage.checked.indexOf(item._id) !== -1}
    //                         tabIndex={-1}
    //                         disableRipple
    //                         inputProps={{ 'aria-labelledby': `checkbox-list-label-1${null}` }}
    //                     />
    //                 </ListItemIcon>
    //                 <ListItemAvatar>
    //                     <Avatar alt="Flag" src={this.renderImage_Nation(item)} />
    //                 </ListItemAvatar>
    //                 <ListItemText primary={item.name} secondary={item.languages[0].name} />
    //                 <ListItemSecondaryAction>
    //                     <DescriptionOutlinedIcon
    //                         onClick={this.handleToggle(item._id)}
    //                         onMouseOver={() => {
    //                             console.log('MouseOver');
    //                         }}
    //                         color='action' />
    //                 </ListItemSecondaryAction>
    //             </ListItem>
    //         ))
    //         : null
    // )

    // handleClick = () => {
    //     this.setState({ open: !this.state.open })
    // }

    // handleAngle = () => (
    //     this.state.open ?
    //         <FontAwesomeIcon
    //             icon={faAngleUp}
    //             className="icon"
    //         />
    //         :
    //         <FontAwesomeIcon
    //             icon={faAngleDown}
    //             className="icon" />
    // )

    handleClose = () => {

    }

    // handleToggle = value => () => {
    //     const checked = this.state.localStorage.checked;
    //     const currentIndex = checked.indexOf(value)
    //     const newChecked = [...checked];

    //     if (currentIndex === -1) {
    //         newChecked.push(value)
    //     } else {
    //         newChecked.splice(currentIndex, 1)
    //     }

    //     this.setState({
    //         localStorage: { checked: newChecked }
    //     }, () => {
    //         this.props.handleFilters(newChecked)
    //     })

    // }

    render() {
        return (
            <div>
                <Popover
                    open={this.state.localStorage.open}
                    anchorEl={this.props.anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    onClose={this.handleClose()}
                    id="mouse-over-popover"

                >
                            Let Google help apps determine location. This means sending anonymous location data to
                            Google, even when no apps are running.
                </Popover>

            </div>
        )
    }

    // render() {
    //     return (
    //         <div>
    //             {this.renderItems()}
    //         </div>

    //     );
    // }
}


const mapStateToProps = (state) => {

    return {
        languages: state.languages,
        nation: state.nation

    }
}

export default connect(mapStateToProps)(ModalLanguagesBlock);

// const ListLanguagesBlock = (props) => {





//     return (

//         <div>
//             {renderItems()}
//         </div>
//     );
// }

// export default ListLanguagesBlock;