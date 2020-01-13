import React, { Component } from 'react'
import { MDBInput } from "mdbreact";
import { MDBBtn } from "mdbreact";
import Home from '../home';
import { withRouter } from 'react-router-dom';
import $ from 'jquery'
import moment from 'moment';

export class InputConsultantOffer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            salute: 'Mr.',
            employeeName: '',
            joiningDate: '',
            reportingDate: '',
            noticePeriod: '',
            companyLocation: '',
            date: '',
            CIN: '',
            designation: '',
            withWaterMark: false,
            withHeader: false,
            gender: {
                gender1: 'He',
                gender2: 'him',
                gender3: 'his'
            },

            // valiadation state variables
            showAddress: '',
            showNoticePeriod: '',
            showEmployeeName: '',
            showJoiningDate: '',
            showDate: '',
            showCIN: '',
            reportingDate: '',
            showDesignation: '',
            showCompanyLocation: '',
            validDate: ''
        }
    }


    componentDidMount() {


        let editClick = localStorage.getItem("editClick");
        if (editClick) {
            this.setState({



                salute: this.props.empData.salute,
                employeeName: this.props.empData.employeeName,
                employeeId: this.props.empData.employeeId,
                designation: this.props.empData.designation,
                companyLocation: this.props.empData.companyLocation,
                joiningDate: this.props.empData.joiningDate,
                reportingDate: this.props.empData.reportingDate,
                
                noticePeriod: this.props.empData.noticePeriod

            })

        }
        var that = this;
        $(document).ready(() => {
            $('#generate').click((e) => {
                debugger
                console.log("inside CDM")
                debugger;

                const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];


                const nth = (d) => {
                    if (d > 3 && d < 21) return 'th';
                    switch (d % 10) {
                        case 1: return "st";
                        case 2: return "nd";
                        case 3: return "rd";
                        default: return "th";
                    }
                }

                let today = new Date();
                let currentdate = today.getDate() + nth(today.getDate()) + ' ' + monthNames[today.getMonth()] + ' ' + today.getFullYear();
                this.setState({
                    date: today
                })

                var d = new Date();
                console.log("Date =", d.setMonth(d.getMonth() + 7))

                console.log("dattetaetaetaet ", this.state)
                if (this.state.salute === "Ms." || this.state.salute === "Mrs.") {
                    this.setState({
                        ...this.state,
                        gender: {
                            gender1: 'She',
                            gender2: 'her',
                            gender3: 'her'
                        }
                    })
                }


                let joiningDate = (document.getElementById("joiningDate").value).trim();
                let designation = (document.getElementById("designation").value).trim();
               
                let companyLocation = (document.getElementById("companyLocation").value).trim();
                let employeeName = (document.getElementById("employeeName").value).trim();
                let reportingDate = (document.getElementById("reportingDate").value).trim();
                let noticePeriod = (document.getElementById("noticePeriod").value).trim();
                let selectedReportingDate = new Date(reportingDate)
                let selectedJoiningDate = new Date(joiningDate);
                
                let now = new Date()

                console.log("Inside Validation", joiningDate, employeeName, designation);


                if (joiningDate === "") {
                    this.setState({ showJoiningDate: true })
                }
                if (companyLocation === "") {
                    that.setState({ showCompanyLocation: true })
                }
                if (noticePeriod === "") {
                    this.setState({ showNoticePeriod: true })
                }
                if (reportingDate === "") {
                    this.setState({ showreportingDate: true })
                }
                if (designation === "") {
                    this.setState({ showDesignation: true })
                }
               
                
                if (employeeName === "") {
                    this.setState({ showEmployeeName: true })
                }

                /*    if(selectedDate<now){
                      that.setState({
                         validDate:"true"
                      }) 
  
                     return false;
                }  */

                if (selectedReportingDate < selectedJoiningDate) {
                    that.setState({
                        showinvalidDate: true
                    })
                    return false;
                }
                if (noticePeriod!= "" && companyLocation != "" && reportingDate != "" && joiningDate != "" && designation != "" && employeeName !== "") {

                    console.log("True return")
                    return true;
                }
                else {
                    return false;
                }
            });
        });
    }


    hideNoticePeriod = () => {
        this.setState({
            showNoticePeriod: false
        })
    }
    hidereportingDate = () => {
        this.setState({
            showreportingDate: false
        })
    }
    hideEmployeeName = () => {
        this.setState({
            showEmployeeName: false
        })
    }
   
    hideCompanyLocation = () => {
        this.setState({
            showCompanyLocation: false
        })
    }
    hideJoiningDate = () => {
        this.setState({
            showJoiningDate: false
        })
    }
    hideCIN = () => {
        this.setState({
            showCIN: false
        })
    }
    hideDesignation = () => {
        this.setState({
            showDesignation: false
        })
    }
    hideInvaliddate = () => {
        this.setState({
            validDate: false
        })

    }

    onCheckHandler = (event) => {
        debugger;

        console.log("Checkbox value ==", event.target.value)
        if (event.target.value == 'false') {
            this.setState({
                withWaterMark: true
            })
            console.log("if  ==", this.state.withWaterMark)
        }
        else {
            debugger;
            this.setState({
                withWaterMark: false
            })
            console.log("else  ==", this.state.withWaterMark)

        }
    }

    onChangeHeader = (event) => {

        debugger;

        console.log("Checkbox value ==", event.target.value)
        if (event.target.value == 'false') {
            this.setState({
                withHeader: true
            })
            console.log("if  ==", this.state.withHeader)
        }
        else {
            debugger;
            this.setState({
                withHeader: false
            })
            console.log("else  ==", this.state.withHeader)

        }


    }


    pass = (event) => {
        event.preventDefault();
        console.log("this.props.empData========", this.state)



        this.props.clicked(this.state)
        this.props.history.push('/ConsultantOffer')

    }


    render() {

        return (
            <div>
                <Home buttonShow={false} />
                <div >
                    <div className="container-fluid mt-5">
                        <div className="row">
                            <div className="col-auto container mt-5 pb-5">
                                <div style={{ width: '500px' }} className="card m-auto shadow-lg mt-5">
                                    <div class="card-header" style={{ borderRadius: '0px !important', background: 'white' }} >
                                        <h3 className="text-center black-text font-bold ">Consultant Offer Letter</h3>
                                    </div>
                                    <div className="card-body ">
                                        <form onSubmit={this.pass}>

                                            <div className="row">

                                                <div className="col-md-3" style={{ paddingTop: '25px' }}>
                                                    <select class="browser-default custom-select" autocomplete="off" value={this.state.salute} name="salutation" title="salutation" id="salutation" onChange={(event) => {
                                                        this.setState({
                                                            salute: event.target.value
                                                        })
                                                    }}>
                                                        <option selected value="Mr.">Mr.</option>
                                                        <option value="Ms.">Ms.</option>
                                                        <option value="Mrs.">Mrs.</option>
                                                    </select>
                                                </div>
                                                <div className="col-9">
                                                    <MDBInput autocomplete="off" onKeyPress={this.hideEmployeeName}
                                                        value={this.state.employeeName} label="Employee Name" className="w-100" name="employeeName" title="Employee Name" id="employeeName" onChange={(event) => {
                                                            this.setState({
                                                                employeeName: event.target.value
                                                            })
                                                        }} />
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-3 p-0" >

                                                </div>
                                                <div className="col-9 p-0" style={{ width: 0 }}>
                                                    {this.state.showEmployeeName ? <div id="errordiv" className="container-fluid">Please fill out Name field * </div> : null}
                                                </div>
                                            </div>

                                            {/* address */}
                                            <div class="row">
                                               
                                                    <div class="col-12">
                                                    <MDBInput autocomplete="off" value={this.state.companyLocation} onKeyPress={this.hideCompanyLocation} label="Company Location" type="text" name="companyLocation" id="companyLocation" title="Company Location" onChange={(event) => {
                                                        this.setState({
                                                            companyLocation: event.target.value
                                                        })
                                                    }} />

                                               
                                                </div>

                                            </div>

                                            <div className="row" style={{ padding: 0 }}>
                                                
                                                <div className="col-12 p-0" style={{ width: 0 }}>
                                                    {this.state.showCompanyLocation ? <div id="errordiv" className="container-fluid">Please fill out Company Location field * </div> : null}
                                                </div>

                                            </div>


                                            <div className="row">
                                                <div class="col-6">
                                                    <MDBInput autocomplete="off" value={this.state.noticePeriod} onKeyPress={this.hideNoticePeriod} type="number" label="Notice Period Month" title="Notice Period" name="noticePeriod" id="noticePeriod" onChange={(event) => {
                                                        this.setState({
                                                            noticePeriod: event.target.value
                                                        })
                                                    }} />

                                                </div>
                                                <div className="col-6">
                                                    <MDBInput autocomplete="off" onKeyPress={this.hideDesignation}
                                                        value={this.state.designation} label="Designation" name="designation" id="designation" title="Designation" onChange={(event) => {
                                                            this.setState({
                                                                designation: event.target.value
                                                            })
                                                        }} />
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-6 p-0" >
                                                    {this.state.showNoticePeriod ? <div id="errordiv" className="container-fluid">Please fill out Notice Period Month field * </div> : null}
                                                </div>
                                                <div className="col-6 p-0" style={{ width: 0 }}>
                                                    {this.state.showDesignation ? <div id="errordiv" className="container-fluid">Please fill Designation field * </div> : null}
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-6">
                                                    <MDBInput autocomplete="off" value={this.state.joiningDate} type="date" onClick={() => { this.hideJoiningDate(); this.hideInvaliddate() }} onKeyPress={() => { this.hideJoiningDate(); this.hideInvaliddate() }} label="Joined Date" title="Joining Date" name="JoiningDate" id="joiningDate" onChange={(event) => {
                                                        this.setState({
                                                            joiningDate: event.target.value
                                                        }); this.hideJoiningDate(); this.hideInvaliddate();
                                                    }} />
                                                </div>
                                                <div class="col-md-6">
                                                    <MDBInput autocomplete="off" value={this.state.reportingDate} type="date" onClick={() => { this.hidereportingDate(); this.hideInvaliddate(); }} onKeyPress={() => { this.hidereportingDate(); this.hideInvaliddate() }} label="Reporting Date" title="reporting Date" name="reportingDate" id="reportingDate" onChange={(event) => {
                                                        this.setState({
                                                            reportingDate: event.target.value
                                                        }); this.hidereportingDate(); this.hideInvaliddate();
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: 0 }}>
                                                <div className="col-6 p-0" >
                                                    {this.state.showJoiningDate ? <div id="errordiv" className="container-fluid">Please fill out Joining date field * </div> : null}
                                                    {this.state.showJoinInvalid ? <div id="errordiv" className="container-fluid">Joined Date must be equal or less than today's Date * </div> : null}

                                                </div>
                                                <div className="col-6 p-0" style={{ width: 0 }}>
                                                    {this.state.showreportingDate ? <div id="errordiv" className="container-fluid">Please fill out reporting Date field * </div> : null}
                                                    {this.state.showinvalidDate ? <div id="errordiv" className="container-fluid">reporting Date must be greater or equal to Joining Date * </div> : null}
                                                </div>
                                            </div>




                                            <div className=" input-group w-50 container-fluid">
                                                <MDBBtn outline type="submit" id="generate" outline className=" form-control-plaintext  justify-content-center text-center" color="primary">Generate</MDBBtn>

                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>








            </div>
        )
    }
}

export default withRouter(InputConsultantOffer)