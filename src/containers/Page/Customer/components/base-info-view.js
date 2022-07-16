import React, { Component } from 'react';

import { ContactCardWrapper } from './base-info-view.style';
import { BooleanDisplay } from '../../../../components';

export default class extends Component {
  render() {
    var customer = this.props.customer;

    return (
      <ContactCardWrapper className="isoContactCard">
        <div className="isoContactInfoWrapper">
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">ID</p>
            <p className="isoInfoDetails">{customer.id}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Username</p>
            <p className="isoInfoDetails">{customer.username}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Chinese Name</p>
            <p className="isoInfoDetails">{customer.chinese_name}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">First Name</p>
            <p className="isoInfoDetails">{customer.first_name}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Last Name</p>
            <p className="isoInfoDetails">{customer.last_name}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Mobile Phone Number</p>
            <p className="isoInfoDetails">{customer.mobile_phone_number}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Other Contact Number</p>
            <p className="isoInfoDetails">{customer.other_contact_number}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Fax Number</p>
            <p className="isoInfoDetails">{customer.fax_number}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Email</p>
            <p className="isoInfoDetails"><a href={`mailto:${customer.email}`}>{customer.email}</a></p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">District</p>
            <p className="isoInfoDetails">{customer.district}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Address</p>
            <p className="isoInfoDetails">{customer.address}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Source</p>
            <p className="isoInfoDetails">{customer.source}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Referer</p>
            <p className="isoInfoDetails">{customer.referer}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Terms and Conditions</p>
            <p className="isoInfoDetails"><BooleanDisplay value={customer.agreed_terms_and_conditions} /></p>
          </div>
        </div>
      </ContactCardWrapper>
    );
  }
}
