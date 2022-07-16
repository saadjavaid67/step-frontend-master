import LayoutContent from '../../../components/utility/layoutContent';
import { Link } from 'react-router-dom';
import { Button, Input } from 'antd';
import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import { connect } from "react-redux";
import { getAllPayment } from '../../../redux/request/actions'
import { togglePayInvoiceModal } from '../../../redux/ui/actions'
import { ActionContainer, PaginationTable } from '../../../components';
import PayInvoiceModal from './payInvoiceModal';

const { Search } = Input;

class PageComponent extends Component {
  state = {
    size: 20,
    page: 1,
    sort_by: "payment_number desc",
    search_text: undefined
  }
  componentDidMount() {
    this.handleRefershTable();
  }

  tableColumns = () => {
    return [
      {
        title: 'Payment No.',
        dataIndex: 'payment_number',
        key: 'payment_number',
        sorter: true,
        defaultSortOrder: 'descend',
      },
      {
        title: 'Parent Name',
        dataIndex: 'customer.full_name',
        key: 'customer.full_name',
        sorter: true,
        render: (text, object, index) => (
          <Link to={`/app/parent/view/${object.customer.id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
            {object.customer.full_name}
          </Link>
        ),
      },
      {
        title: 'Student Name',
        render: (text, object, index) => {
          return (
            <div>
              {
                object.customer.students.map((student, index) => {
                  return (
                    <Link key={'payment-customer-student-' + student.id} to={`/app/student/view/${student.id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
                      {student.full_name}<br/>
                    </Link>
                  )
                })
              }
            </div>
          )
        }
      },
      {
        title: 'Method',
        dataIndex: 'method.name',
        key: 'method.name',
        sorter: true,
      },
      {
        title: 'Remarks',
        dataIndex: 'remark',
        key: 'remark',
        sorter: true,
      },
      {
        title: 'Credit',
        dataIndex: 'amount',
        key: 'amount',
        sorter: true,
      },
      {
        title: 'Unused Credit',
        dataIndex: 'balance',
        key: 'balance',
        sorter: true,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        rowKey: 'status',
        width: '13%',
        sorter: true,
      },
      {
        title: 'Create Date',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: true,
      },
      {
        title: 'Last Update',
        dataIndex: 'updated_at',
        key: 'updated_at',
        sorter: true,
      },
      {
        title: '',
        dataIndex: 'action',
        rowKey: 'action',
        render: (text, object) => {
          if(object.customer.unpaid_invoice_count > 0 && object.balance > 0){
            return <div className="isoInvoiceBtnView">
            <Button color="primary" onClick={() => this.props.togglePayInvoiceModal({ open: true, payment: object})}>
              Pay Invoice
            </Button>
          </div>
          }
          return <div className="isoInvoiceBtnView"></div>
        },
      },
    ];
  }

  searchFormRef = (form) => {
    this.searchForm = form;
  }

  handleTableChange = (page, size, sort_by) => {
    if(sort_by){
      let sortCol = sort_by.split(" ")[0];
      let sortDirection = sort_by.split(" ")[1];
      if(sortCol === "customer.full_name"){
        sort_by = `customer.last_name ${sortDirection},customer.first_name ${sortDirection}`;
      }
    }
    this.setState({ page, size, sort_by }, () => {
      this.handleRefershTable();
    });
  }


  handleSearchKeyword = (value) => {
    this.setState({
      page: 1,
      search_text: value || undefined,
    }, () => {
      this.handleRefershTable();
    });
  }

  handleRefershTable = () => {
    const { getAllPayment } = this.props;
    const { page, size, sort_by, search_text } = this.state;
    const params = {
      page,
      size,
      sort_by,
      with_model: ['customer', 'customer.students', 'method'],
      search_text
    };
    getAllPayment({ params });
  }

  render() {
    const { getAllPaymentResponse } = this.props;
    return (
      <LayoutWrapper>
        <PageHeader>
          Payment
        </PageHeader>
        <LayoutContent>
          <ActionContainer>
            <Link to="/app/payment/create">
              <Button type="primary" style={{ marginRight: '10px', marginBottom: '10px' }}>
                Add Payment
              </Button>
            </Link>
          </ActionContainer>
          <ActionContainer>
            <Search
              placeholder="Keyword Search (Payment Number / Parent Name / Student Name / Remarks)"
              onSearch={this.handleSearchKeyword}
              enterButton
              style={{ width: 560 }}
            />
          </ActionContainer>
          <PaginationTable response={getAllPaymentResponse} tableColumns={this.tableColumns()} handleTableChange={this.handleTableChange}  />
          <PayInvoiceModal onSuccess={this.handleRefershTable}/>
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    getAllPaymentResponse: state.getAllPayment,
  }),
  {
    getAllPayment,
    togglePayInvoiceModal,
  }
)(PageComponent);


// import LayoutContent from '../../../components/utility/layoutContent';
// import { Link } from 'react-router-dom';
// import { Table, Button, } from 'antd';
// import React, { Component } from 'react';
// import LayoutWrapper from '../../../components/utility/layoutWrapper';
// import PageHeader from '../../../components/utility/pageHeader';
// import { SearchFormWrapper, } from './searchForm.style';
// import SearchForm from './searchForm';
// import { connect } from "react-redux";
// import { StatusTag } from './index.style';
// import { getAllPaymentBySpecification } from '../../../redux/request/actions'
// import { togglePayInvoiceModal } from '../../../redux/ui/actions'
// import PayInvoiceModal from './payInvoiceModal';

// class PageComponent extends Component {
//   state = {
//     size: 20,
//     page: 1,
//     sort: "display_payment_number desc",
//     customer_name: undefined,
//   }
//   componentDidMount() {
//     this.handleRefershTable();
//   }

//   tableColumns = () => {
//     return [
//       {
//         title: 'Payment No.',
//         dataIndex: 'display_payment_number',
//         key: 'display_payment_number',
//         sorter: true,
//         defaultSortOrder: 'descend',
//       },
//       {
//         title: 'Parent Name',
//         dataIndex: 'customer.full_name',
//         key: 'customer.full_name',
//         render: (text, object, index) => (
//           <Link to={`/app/parent/view/${object.customer.id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
//             {object.customer.full_name}
//           </Link>
//         ),
//       },
//       {
//         title: 'Method',
//         dataIndex: 'method.name',
//         key: 'method.name',
//       },
//       {
//         title: 'Remark',
//         dataIndex: 'remark',
//         key: 'remark',
//         sorter: true,
//       },
//       {
//         title: 'Credit',
//         dataIndex: 'amount',
//         key: 'amount',
//         sorter: true,
//       },
//       {
//         title: 'Unused Credit',
//         dataIndex: 'balance',
//         key: 'balance',
//         sorter: true,
//       },
//       {
//         title: 'Status',
//         dataIndex: 'status',
//         rowKey: 'status',
//         width: '13%',
//         sorter: true,
//         render: (text, object) => {
//           return <div><StatusTag className={text}>{text}</StatusTag></div>;
//         },
//       },
//       {
//         title: 'Create Date',
//         dataIndex: 'created_at',
//         key: 'created_at',
//         sorter: true,
//       },
//       {
//         title: '',
//         dataIndex: 'action',
//         rowKey: 'action',
//         render: (text, object) => {
//           if(object.customer.unpaid_invoice_count > 0 && object.balance > 0){
//             return <div className="isoInvoiceBtnView">
//             <Button color="primary" onClick={() => this.props.togglePayInvoiceModal({ open: true, payment: object})}>
//               Pay Invoice
//             </Button>
//           </div>
//           }
//           return <div className="isoInvoiceBtnView"></div>
//         },
//       },
//     ];
//   }

//   searchFormRef = (form) => {
//     this.searchForm = form;
//   }

//   handleTableChange = (pagination, filters, sorter) => {
//     console.log("pagination", pagination, "filters", filters, "sorter", sorter);
//     const page = pagination.current;
//     const size = pagination.pageSize;
//     const sort = sorter.columnKey ? (sorter.columnKey + " " + (sorter.order === "ascend"? "asc" : "desc")): null;
//     this.setState({ page, size, sort },() => {
//       this.handleRefershTable();
//     });
//   }

//   searchFormSumbit = (e) => {
//     e.preventDefault();
//     this.searchForm.validateFieldsAndScroll((err, values) => {
//       if (!err) {
//         const updateState = {
//           page: 1,
//           customer_name: values.customer_name || undefined,
//         };
//         this.setState(updateState, () => {
//           this.handleRefershTable();
//         });
//       }
//     });
//   }

//   handleRefershTable = () => {
//     const { getAllPaymentBySpecification } = this.props;
//     const params = {
//       page: this.state.page,
//       size: this.state.size,
//       sort: this.state.sort,
//       customer_name: this.state.customer_name,
//     };
//     getAllPaymentBySpecification({ params });
//   }

//   render() {
//     const { loading, response } = this.props;
//     let data = [];
//     let pagination = {}
//     if (response) {
//       data = response.data;
//       pagination = {
//         total: response.total,
//         current: response.current_page,
//         pageSize: response.per_page,
//         showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
//       };
//     }

//     return (
//       <LayoutWrapper>
//         <PageHeader>
//           Credit Balance
//         </PageHeader>
//         <LayoutContent>
//           <Link to="/app/payment/create">
//             <Button type="primary" style={{ marginRight: '10px', marginBottom: '10px' }}>
//               Add Payment
//                 </Button>
//           </Link>
//           <SearchFormWrapper>
//             <SearchForm ref={form => this.searchFormRef(form)} onSubmit={this.searchFormSumbit} />
//           </SearchFormWrapper>
//           <Table
//             className="components-table-demo-nested"
//             rowKey={record => record.id}
//             columns={this.tableColumns()}
//             dataSource={data}
//             pagination={pagination}
//             loading={loading}
//             onChange={this.handleTableChange}
//             size="middle" />
//           <PayInvoiceModal onSuccess={this.handleRefershTable}/>
//         </LayoutContent>
//       </LayoutWrapper>
//     );
//   }
// }

// export default connect(
//   state => ({
//     response: state.getAllPaymentBySpecification.data,
//     loading: state.getAllPaymentBySpecification.isFetching,
//   }),
//   {
//     getAllPaymentBySpecification,
//     togglePayInvoiceModal,
//   }
// )(PageComponent);
