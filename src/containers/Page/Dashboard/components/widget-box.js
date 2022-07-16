import React, { Component } from 'react';
import { WidgetBox } from '../style/style';

export default class extends Component {
  render() {
    const { children, style, height, padding } = this.props;

    return (
      <WidgetBox
        className="isoWidgetBox"
        height={height}
        padding={padding}
        style={style}
      >
        {children}
      </WidgetBox>
    );
  }
}
