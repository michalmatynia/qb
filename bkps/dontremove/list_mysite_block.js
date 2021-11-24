import React, { Component } from 'react';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from 'react-redux';

import MyButton from '../../client/src/components/utils/button';
import { Icon } from '@material-ui/core';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';


class ListBlockLarge extends Component {

    state = {
        localStorage: {
            checked: []
        }
    }


    componentDidUpdate(prevProps, prevState) {

    }

    componentDidMount() {

    }

    renderImage = (item) => {
        if (item.mysitePrefs.images.length > 0) {
            return item.mysitePrefs.images[0].secure_url
        } else {
            return '/images/image_not_availble.png'
        }
    }

    renderItems = (list) => (

        list ?
            list.map((item, i) => (
                <div className="admin_list_block" key={item._id}>

                    <div className="item">
                        <div
                            className="image"
                            style={{ background: `url(${this.renderImage(item)}) no-repeat` }}
                        >

                        </div>
                    </div>
                    <div className="item">
                        <div>
                            {item.name}
                        </div>
                        <div>
                            Position {item.position}
                        </div>
                    </div>
                    <div>
                        <Icon color='primary'>
                            <ArrowUpward
                                onClick={() => this.props.changePosition({id:item._id, direction: -1, currentPosition : item.position})}
                            />
                        </Icon>
                        <Icon color='primary'>
                            <ArrowDownward
                                onClick={() => this.props.changePosition({id: item._id, direction: 1, currentPosition : item.position})}
                            />
                        </Icon>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={item.isdefault}
                                    // onChange={handleChange('checkedA')}
                                    onClick={() => this.props.handleDefault({id : item._id, checked : item.isdefault})}
                                    // value="checkedA"
                                    // inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    color="primary"
                                />
                            }
                            label={item.isdefault ? "On" : "Off"}
                            size="small"
                            labelPlacement="top"
                        />
                        <div className="list_btn list_btn_remove"
                            onClick={() => this.props.removeItem({id : item._id})} >
                            Remove
                </div>
                        <MyButton
                            type="default"
                            altClass="card_link"
                            title="Edit"
                            linkTo={`/admin/edit_mysite/${item._id}`}
                            addStyles={{
                                margin: '10px 0 0 0'
                            }}
                        />

                    </div>


                </div >
            ))
            : null
    )

    render() {
        return (
            <div>
                {this.renderItems(this.props.mysite.ListMysite)}

            </div>
        )
    }

}



const mapStateToProps = (state) => {

    return {
        mysite: state.mysite,
        user: state.user
    }
}

export default connect(mapStateToProps)(ListBlockLarge);