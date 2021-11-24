import React, { Component } from 'react';
import { connect } from 'react-redux';

import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'


class FormColorPicker extends Component {

    state = {
        displayColorPicker: false,
    }

    async componentDidUpdate(prevProps, prevState) { }

    async componentDidMount() { }

    async componentWillUnmount() { }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        this.setState({ color: color.rgb })

        let newFormcell = { ...this.props.formcell }

        newFormcell.value = color.rgb
        this.props.change({ value: color, cell: { [this.props.formcellkey]: newFormcell } })

    };


    render() {

        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${this.props.formcell.value.r}, ${this.props.formcell.value.g}, ${this.props.formcell.value.b}, ${this.props.formcell.value.a})`,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div>{this.props.formcell.configparams.showlabel ?
                <div>{this.props.formcell.config.label}</div>
                : null}
                <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                </div>
                { this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <SketchPicker color={this.state.color}
                        onChange={this.handleChange}
                    />
                </div> : null}
            </div>

        );
    }
}

const mapStateToProps = (state) => {

    return {
        user: state.user,
        messages: state.messages
    }
}

export default connect(mapStateToProps)(FormColorPicker);

