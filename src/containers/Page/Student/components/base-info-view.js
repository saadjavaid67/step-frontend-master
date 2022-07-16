import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Divider, } from 'antd';
import { ContactCardWrapper } from './base-info-view.style';
import { BooleanDisplay } from '../../../../components';

export default class extends Component {
  render() {
    var student = this.props.student;
    return (
      <ContactCardWrapper className="isoContactCard">
        <div className="isoContactInfoWrapper">
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">ID</p>
            <p className="isoInfoDetails">{student.id}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">First Name</p>
            <p className="isoInfoDetails">{student.first_name}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Last Name</p>
            <p className="isoInfoDetails">{student.last_name}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Chinese Name</p>
            <p className="isoInfoDetails">{student.chinese_name}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Gender</p>
            <p className="isoInfoDetails">{student.gender === "F" ? "Female" : "Male"}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Birthday</p>
            <p className="isoInfoDetails">{student.birthday}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">School</p>
            <p className="isoInfoDetails">{student.school}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Level of Study</p>
            <p className="isoInfoDetails">{student.level_of_study}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Special Attention</p>
            <p className="isoInfoDetails">{student.special_attention}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Age</p>
            <p className="isoInfoDetails">{`${student.age} Month / ${student.age_year} Year`}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Pre ASQ</p>
            <p className="isoInfoDetails">{student.asq_level !== -1 ? student.asq_level : "Initial needed"}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Next ASQ</p>
            <p className="isoInfoDetails">{student.next_asq !== -1 ? student.next_asq : "-"}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Terms and Conditions</p>
            <p className="isoInfoDetails"><BooleanDisplay value={student.agreed_terms_and_conditions} /></p>
          </div>
          {
            student.customer ? <>
              <Divider style={{margin: '0 0 32px'}} orientation="left">Guardian</Divider>
              <div className="isoContactCardInfos">
                <p className="isoInfoLabel">Full Name</p>
                <p className="isoInfoDetails">
                  <Link to={`/app/parent/view/${student.customer.id}`}>
                    {student.customer.full_name}
                  </Link>
                </p>
              </div>
              <div className="isoContactCardInfos">
                <p className="isoInfoLabel">First Name</p>
                <p className="isoInfoDetails">{student.customer.first_name}</p>
              </div>
              <div className="isoContactCardInfos">
                <p className="isoInfoLabel">Last Name</p>
                <p className="isoInfoDetails">{student.customer.last_name}</p>
              </div>
              <div className="isoContactCardInfos">
                <p className="isoInfoLabel">Chinese Name</p>
                <p className="isoInfoDetails">{student.customer.chinese_name}</p>
              </div>
              <div className="isoContactCardInfos">
                <p className="isoInfoLabel">Mobile Phone Number</p>
                <p className="isoInfoDetails">{student.customer.mobile_phone_number}</p>
              </div>
              <div className="isoContactCardInfos">
                <p className="isoInfoLabel">Other Contact Number</p>
                <p className="isoInfoDetails">{student.customer.other_contact_number}</p>
              </div>
              <div className="isoContactCardInfos">
                <p className="isoInfoLabel">Fax Number</p>
                <p className="isoInfoDetails">{student.customer.fax_number}</p>
              </div>
              <div className="isoContactCardInfos">
                <p className="isoInfoLabel">E-mail Address</p>
                <p className="isoInfoDetails">{student.customer.email}</p>
              </div>
              <div className="isoContactCardInfos">
                <p className="isoInfoLabel">Address in English</p>
                <p className="isoInfoDetails">{student.customer.address}</p>
              </div>
            </> : null
          }
          <Divider style={{margin: '0 0 32px'}} orientation="left">Emergency Contact</Divider>
          {
            student.emergency_contacts ?
              student.emergency_contacts.map((emergencyContact) => {
                return (
                  <>
                    <div className="isoContactCardInfos">
                      <p className="isoInfoLabel">Name</p>
                      <p className="isoInfoDetails">{emergencyContact.name}</p>
                    </div>
                    <div className="isoContactCardInfos">
                      <p className="isoInfoLabel">Contact Number</p>
                      <p className="isoInfoDetails">{emergencyContact.contact_number}</p>
                    </div>
                    <div className="isoContactCardInfos">
                      <p className="isoInfoLabel">Relationship</p>
                      <p className="isoInfoDetails">{emergencyContact.relationship}</p>
                    </div>
                    <br />
                  </>
                )
              }) : null
          }
        </div>
      </ContactCardWrapper>
    );
  }
}
