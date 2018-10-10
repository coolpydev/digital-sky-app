import React from 'react';
import FooterApplicationForm from './FooterApplicationForm';
import FooterApplicationReviewDeclaration from './FooterApplicationReviewDeclaration';
import HeaderApplicationForm from './HeaderApplicationForm';
import FormErrors from './FormErrors';
import UINApplicationView from './UINApplicationView';

class UINApplicationStep3 extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.downloadDocument = this.downloadDocument.bind(this);
        this.state = {
            submitted: false
        };
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.setState({submitted: true});
        
        var applicationForm = {...this.props.applicationForm,
            status: "SUBMITTED"
        }
        this.setState({applicationForm : this.props.applicationForm });

        var formData = new FormData();
        formData.append("uinApplication", JSON.stringify(applicationForm)) ;
        this.props.updateApplication(formData, this.props.applicationForm.id );
    }

    downloadDocument(documentName){
        this.props.downloadDocument(documentName);
    }

    render() {
        
        const { saving, applicationForm, previousStep, step, errors, headerText} = this.props;
        return (
            <div className="page-form">
                <FormErrors errors = { errors }/>
                <form name="uinApplicationForm" onSubmit={ this.handleSubmit }>
                    <div id="application-preview">
                        <div className="grid-container">
                            <div className="grid-x grid-padding-x">
                                <HeaderApplicationForm headerText= { headerText } step= { step } applicationStatus = { applicationForm.status } /> 
                                <UINApplicationView application= { applicationForm } downloadDocument = { this.downloadDocument } />

                                { (!applicationForm.status || applicationForm.status === 'DRAFT' ) &&
                                    <div className="large-12 cell"> 
                                        <FooterApplicationReviewDeclaration applicant = { applicationForm.applicant } type="uin"/>
                                        <FooterApplicationForm  step= { step } saving={ saving } previousStep= { previousStep }/>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>  
        );
    }
}

export default UINApplicationStep3;