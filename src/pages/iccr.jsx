import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Modal } from 'react-bootstrap';
import {
    BookFill,
    PersonCheckFill,
    FileEarmarkTextFill,
    InfoCircleFill,
    AwardFill,
    GeoAltFill,
    CheckSquareFill,
    Pen
} from 'react-bootstrap-icons';
import axios from 'axios';

const ICCR = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        dateOfBirth: '',
        placeOfBirth: '',
        country: '',
        passport: '',
        passportCountry: '',
        passportIssueDate: '',
        passportExpiryDate: '',
        city: '',
        state: '',
        addressCountry: '',
        zipcode: '',
        mobileNumber: '',
        whatsappNumber: '',
        email: '',
        uniqueId: '',
        fatherName: '',
        fatherPhone: '',
        fatherEmail: '',
        motherName: '',
        motherPhone: '',
        motherEmail: '',
        englishProficiency1: '',
        proficiencyLevel: '',
        proficiencyScore: '',
        englishProficiency2: '',
        toeflScore: '',
        ieltsScore: '',
        duolingoScore: '',
        essay: '',
        academicYear: '',
        levelOfCourse: '',
        courseMainStream: '',
        universities: Array(3).fill(''),
        subjects: Array(3).fill(''),
        courseStreams: Array(3).fill(''),
        grade10Certificate: '',
        grade10Country: '',
        grade10Board: '',
        grade10School: '',
        grade10Subjects: '',
        grade10Year: '',
        grade10Percentage: '',
        grade12Certificate: '',
        grade12Country: '',
        grade12Board: '',
        grade12School: '',
        grade12Subjects: '',
        grade12Year: '',
        grade12Percentage: '',
        educationalQualifications: [
            {
                certificate: '',
                country: '',
                boardName: '',
                schoolName: '',
                subjects: '',
                year: '',
                percentage: ''
            }
        ],
        references: [
            {
                name: '',
                occupation: '',
                email: '',
                telephone: '',
                postalAddress: ''
            },
            {
                name: '',
                occupation: '',
                email: '',
                telephone: '',
                postalAddress: ''
            }
        ],
        indianContacts: [
            {
                name: '',
                relationship: '',
                occupation: '',
                telephone: '',
                email: '',
                postalAddress: ''
            }
        ],
        travelledToIndia: '',
        previousICCRScholarship: '',
        indianResident: '',
        marriedToIndian: '',
        internationalDrivingLicense: '',
        otherInformation: '',
        declarationDate: '',
        declarationPlace: '',
        signature: '', // Add this new field
        documents: {
            permanentUniqueId: null,
            passportCopy: null,
            gradeXMarksheet: null,
            gradeXIIMarksheet: null,
            medicalFitnessCertificate: null,
            englishTranslationOfDocuments: null,
            englishAsSubjectDocument: null,
            anyOtherDocument: null
        },
        studentPhoto: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Add this state

    // Add this initial form data structure
    const initialFormData = {
        fullName: '',
        gender: '',
        dateOfBirth: '',
        placeOfBirth: '',
        country: '',
        passport: '',
        passportCountry: '',
        passportIssueDate: '',
        passportExpiryDate: '',
        city: '',
        state: '',
        addressCountry: '',
        zipcode: '',
        mobileNumber: '',
        whatsappNumber: '',
        email: '',
        uniqueId: '',
        fatherName: '',
        fatherPhone: '',
        fatherEmail: '',
        motherName: '',
        motherPhone: '',
        motherEmail: '',
        englishProficiency1: '',
        proficiencyLevel: '',
        proficiencyScore: '',
        englishProficiency2: '',
        toeflScore: '',
        ieltsScore: '',
        duolingoScore: '',
        essay: '',
        academicYear: '',
        levelOfCourse: '',
        courseMainStream: '',
        universities: Array(3).fill(''),
        subjects: Array(3).fill(''),
        courseStreams: Array(3).fill(''),
        grade10Certificate: '',
        grade10Country: '',
        grade10Board: '',
        grade10School: '',
        grade10Subjects: '',
        grade10Year: '',
        grade10Percentage: '',
        grade12Certificate: '',
        grade12Country: '',
        grade12Board: '',
        grade12School: '',
        grade12Subjects: '',
        grade12Year: '',
        grade12Percentage: '',
        educationalQualifications: [
            {
                certificate: '',
                country: '',
                boardName: '',
                schoolName: '',
                subjects: '',
                year: '',
                percentage: ''
            }
        ],
        references: [
            {
                name: '',
                occupation: '',
                email: '',
                telephone: '',
                postalAddress: ''
            },
            {
                name: '',
                occupation: '',
                email: '',
                telephone: '',
                postalAddress: ''
            }
        ],
        indianContacts: [
            {
                name: '',
                relationship: '',
                occupation: '',
                telephone: '',
                email: '',
                postalAddress: ''
            }
        ],
        travelledToIndia: '',
        previousICCRScholarship: '',
        indianResident: '',
        marriedToIndian: '',
        internationalDrivingLicense: '',
        otherInformation: '',
        declarationDate: '',
        declarationPlace: '',
        signature: '',
        documents: {
            permanentUniqueId: null,
            passportCopy: null,
            gradeXMarksheet: null,
            gradeXIIMarksheet: null,
            medicalFitnessCertificate: null,
            englishTranslationOfDocuments: null,
            englishAsSubjectDocument: null,
            anyOtherDocument: null
        },
        studentPhoto: ''
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            const formDataToSend = new FormData();

            // Add all text fields
            Object.keys(formData).forEach(key => {
                if (key !== 'documents' && key !== 'studentPhoto' && key !== 'signature' &&
                    !Array.isArray(formData[key]) && formData[key] !== null && formData[key] !== undefined) {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // Handle arrays
            if (formData.educationalQualifications) {
                formData.educationalQualifications.forEach((edu, index) => {
                    Object.keys(edu).forEach(key => {
                        formDataToSend.append(`educationalQualifications[${index}][${key}]`, edu[key]);
                    });
                });
            }

            if (formData.universities) {
                formData.universities.forEach((univ, index) => {
                    formDataToSend.append(`universities[${index}]`, univ);
                });
            }

            if (formData.subjects) {
                formData.subjects.forEach((subject, index) => {
                    formDataToSend.append(`subjects[${index}]`, subject);
                });
            }

            if (formData.courseStreams) {
                formData.courseStreams.forEach((stream, index) => {
                    formDataToSend.append(`courseStreams[${index}]`, stream);
                });
            }

            if (formData.references) {
                formData.references.forEach((ref, index) => {
                    Object.keys(ref).forEach(key => {
                        formDataToSend.append(`references[${index}][${key}]`, ref[key]);
                    });
                });
            }

            if (formData.indianContacts) {
                formData.indianContacts.forEach((contact, index) => {
                    Object.keys(contact).forEach(key => {
                        formDataToSend.append(`indianContacts[${index}][${key}]`, contact[key]);
                    });
                });
            }

            // Handle file uploads
            if (formData.studentPhoto) {
                const photoFile = await fetch(formData.studentPhoto).then(r => r.blob());
                formDataToSend.append('studentPhoto', photoFile, 'studentPhoto.jpg');
            }

            if (formData.signature) {
                const signatureFile = await fetch(formData.signature).then(r => r.blob());
                formDataToSend.append('signature', signatureFile, 'signature.jpg');
            }

            // Handle document uploads
            const documentFields = {
                permanentUniqueId: 'permanentUniqueId',
                passportCopy: 'passportCopy',
                gradeXMarksheet: 'gradeXMarksheet',
                gradeXIIMarksheet: 'gradeXIIMarksheet',
                medicalFitnessCertificate: 'medicalFitnessCertificate',
                englishTranslationOfDocuments: 'englishTranslationOfDocuments',
                englishAsSubjectDocument: 'englishAsSubjectDocument',
                anyOtherDocument: 'anyOtherDocument'
            };

            Object.entries(documentFields).forEach(([key, fieldName]) => {
                if (formData.documents && formData.documents[key]) {
                    formDataToSend.append(fieldName, formData.documents[key]);
                }
            });

            const response = await axios.post(
                `https://crm.indiaeducates.org/api/iccr`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // If we reach here, the submission was successful
            setShowSuccessModal(true);
            // Reset form data
            setFormData({
                ...initialFormData,
                documents: {
                    ...initialFormData.documents,
                    permanentUniqueId: null,
                    passportCopy: null,
                    gradeXMarksheet: null,
                    gradeXIIMarksheet: null,
                    medicalFitnessCertificate: null,
                    englishTranslationOfDocuments: null,
                    englishAsSubjectDocument: null,
                    anyOtherDocument: null
                }
            });

        } catch (error) {
            console.error('Error submitting application:', error);
            // Only show error alert if it's actually a submission error
            if (!error.message.includes('Failed to reload')) {
                alert('Failed to submit application. Please try again.');
            } else {
                // If it's just a Vite reload error, still show success if data was saved
                setShowSuccessModal(true);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUniversityChange = (index, value) => {
        const newUniversities = [...formData.universities];
        newUniversities[index] = value;
        setFormData(prev => ({
            ...prev,
            universities: newUniversities
        }));
    };

    // Add this function to handle smooth scrolling
    const scrollToApplicationForm = () => {
        const applicationForm = document.getElementById('application-form');
        if (applicationForm) {
            applicationForm.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Add this function to handle adding new preference
    const handleAddPreference = () => {
        if (formData.universities.length < 5) {  // Maximum 5 preferences
            setFormData(prev => ({
                ...prev,
                universities: [...prev.universities, ''],
                subjects: [...prev.subjects, ''],
                courseStreams: [...prev.courseStreams, '']
            }));
        }
    };

    // Add this function to handle adding new qualification
    const handleAddQualification = () => {
        setFormData(prev => ({
            ...prev,
            educationalQualifications: [
                ...prev.educationalQualifications,
                {
                    certificate: '',
                    country: '',
                    boardName: '',
                    schoolName: '',
                    subjects: '',
                    year: '',
                    percentage: ''
                }
            ]
        }));
    };

    // Add this function to handle qualification changes
    const handleQualificationChange = (index, field, value) => {
        const newQualifications = [...formData.educationalQualifications];
        newQualifications[index] = {
            ...newQualifications[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            educationalQualifications: newQualifications
        }));
    };

    // Add this function to handle reference changes
    const handleReferenceChange = (index, field, value) => {
        const newReferences = [...formData.references];
        newReferences[index] = {
            ...newReferences[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            references: newReferences
        }));
    };

    // Add this function to handle adding new reference
    const handleAddReference = () => {
        if (formData.references.length < 5) {  // Maximum 5 references
            setFormData(prev => ({
                ...prev,
                references: [
                    ...prev.references,
                    {
                        name: '',
                        occupation: '',
                        email: '',
                        telephone: '',
                        postalAddress: ''
                    }
                ]
            }));
        }
    };

    // Add this function to handle Indian contact changes
    const handleIndianContactChange = (index, field, value) => {
        const newContacts = [...formData.indianContacts];
        newContacts[index] = {
            ...newContacts[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            indianContacts: newContacts
        }));
    };

    // Add this function to handle adding new Indian contact
    const handleAddIndianContact = () => {
        if (formData.indianContacts.length < 5) {  // Maximum 5 contacts
            setFormData(prev => ({
                ...prev,
                indianContacts: [
                    ...prev.indianContacts,
                    {
                        name: '',
                        relationship: '',
                        occupation: '',
                        telephone: '',
                        email: '',
                        postalAddress: ''
                    }
                ]
            }));
        }
    };

    // Add this new function to handle signature upload
    const handleSignatureUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    signature: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Add this new handler for document uploads
    const handleDocumentUpload = (e, docType) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                documents: {
                    ...prev.documents,
                    [docType]: file
                }
            }));
        }
    };

    // Add this handler function with your other handlers
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    studentPhoto: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Update the SuccessModal component
    const SuccessModal = () => (
        <Modal
            show={showSuccessModal}
            centered
            size="lg"
            onHide={() => {
                setShowSuccessModal(false);
                setFormData(initialFormData); // Reset form data when closing modal
                window.scrollTo(0, 0); // Scroll to top of page
            }}
        >
            <Modal.Body className="text-center p-5">
                <div className="mb-4">
                    <div className="d-flex justify-content-center">
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: '#28a745',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '20px'
                        }}>
                            <CheckSquareFill style={{ fontSize: '40px', color: 'white' }} />
                        </div>
                    </div>
                    <h2 className="mb-3" style={{ color: '#28a745' }}>Thank You!</h2>
                    <h4 className="mb-4">Your Application Has Been Submitted Successfully</h4>
                    <p className="text-muted mb-4">
                        We have received your ICCR scholarship application. Our team will review your application and contact you soon.
                    </p>
                    <Button
                        variant="success"
                        size="lg"
                        onClick={() => {
                            setShowSuccessModal(false);
                            setFormData(initialFormData); // Reset form data when clicking close button
                            window.scrollTo(0, 0); // Scroll to top of page
                        }}
                        style={{
                            borderRadius: '50px',
                            padding: '10px 30px'
                        }}
                    >
                        Close
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );

   

    return (
        <>
            {/* Enhanced Header */}
            <div className="sticky-top" style={{
                backgroundColor: '#fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                zIndex: 1000,
                marginBottom: '-3rem',
                borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}>
                <Container fluid>
                    <Row className="py-3 align-items-center">
                        <Col xs={12} md={3} className="d-flex align-items-center justify-content-center justify-content-md-start mb-3 mb-md-0">
                            <a href="https://indiaeducates.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="d-flex align-items-center"
                                style={{ transition: 'transform 0.2s' }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <img
                                    src="/images/IndiaEducatesLogo.png"
                                    alt="India Educates Logo"
                                    style={{
                                        height: '45px',
                                        maxWidth: '100%',
                                        cursor: 'pointer',
                                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                                    }}
                                />
                            </a>
                        </Col>
                        <Col xs={12} md={7} className="text-center mb-3 mb-md-0">
                            <div className="d-flex flex-column align-items-center justify-content-center">
                                <h1 className="mb-0 position-relative" style={{
                                    color: '#1a1a1a',
                                    fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                                    fontWeight: '700',
                                    letterSpacing: '1px',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                                    textAlign: 'center'
                                }}>
                                    <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill"
                                        style={{
                                            fontSize: '0.7rem',
                                            fontWeight: '1000',
                                            transform: 'translateY(-50%)',
                                        }}>
                                        New
                                    </span>
                                    ICCR SCHOLARSHIPS
                                </h1>
                                <div className="d-flex align-items-center mt-2">
                                    <span style={{
                                        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                                        color: '#666',
                                        fontWeight: '500'
                                    }}>
                                        Your Gateway to Excellence in Indian Education
                                    </span>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={2} className="d-flex align-items-center justify-content-center">
                            <Button
                                className="px-4 py-2 d-flex align-items-center"
                                style={{
                                    backgroundColor: '#ff5722',
                                    border: 'none',
                                    borderRadius: '50px',
                                    fontSize: 'clamp(0.875rem, 2vw, 15px)',
                                    fontWeight: '600',
                                    boxShadow: '0 4px 12px rgba(255,87,34,0.3)',
                                    transition: 'all 0.3s ease',
                                    width: 'fit-content'
                                }}
                                onClick={scrollToApplicationForm}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 15px rgba(40,167,69,0.4)';
                                    e.currentTarget.style.backgroundColor = '#28a745';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,87,34,0.3)';
                                    e.currentTarget.style.backgroundColor = '#ff5722';
                                }}
                            >
                                <span className="me-2">APPLY NOW</span>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container fluid className="py-5" style={{ backgroundColor: '#f8f9fa', paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '0 !important' }}>
                {/* Header Banner with Background Image */}
                <Row className="mb-5">
                    <Col>
                        <Card className="text-center border-0 text-white">
                            <Card.Body className="py-5" style={{
                                backgroundImage: 'url("/images/iccr.png")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                minHeight: 'clamp(300px, 50vw, 500px)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                padding: '20px',
                                position: 'relative',
                            }}>
                                {/* Dark overlay */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: '#0c1322',
                                    opacity: 0.85,
                                }} />

                                {/* Content */}
                                <div style={{
                                    position: 'relative',
                                    zIndex: 1,
                                    textAlign: 'left',
                                    maxWidth: '800px',
                                    margin: '0 auto',
                                    padding: '0 20px'
                                }}>
                                    <div className="mb-4">
                                        <h5 className="text-uppercase mb-3"
                                            style={{
                                                letterSpacing: '2px',
                                                fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                                            }}>
                                            YOUR PATHWAY TO EXCELLENCE
                                        </h5>
                                        <h1 className="display-3 fw-bold mb-3"
                                            style={{
                                                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                                lineHeight: '1.2'
                                            }}>
                                            OFFER OF SCHOLARSHIPS TO STUDY IN INDIA
                                        </h1>
                                        <p className="lead mb-4 fw-semibold"
                                            style={{
                                                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
                                            }}>
                                            UNDER ICCR AFRICA SCHOLARSHIPS SCHEME: 2025-26
                                        </p>
                                    </div>
                                    <Alert className="d-inline-block text-light rounded-pill fw-bold"
                                        style={{
                                            backgroundColor: '#ff5722',
                                            border: 'none',
                                            fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                                        }}>
                                        Application Deadline: May 31, 2025
                                    </Alert>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Main Content with Side Image */}
                <Row className="mb-5">
                    <Col md={10} className="mx-auto">
                        <Card className="border-0" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9f2ff 100%)' }}>
                            <Row className="g-0">
                                <Col md={8}>
                                    <Card.Body className="p-4">
                                        <div className="mb-4">
                                            <h6 className="text-success mb-2" style={{ fontWeight: '600' }}>ABOUT THE PROGRAM</h6>
                                            <h2 className="mb-3" style={{
                                                color: '#1a1a1a',
                                                fontWeight: '700',
                                                fontSize: '2rem'
                                            }}>
                                                INTRODUCTION TO<br />
                                                <span style={{ color: '#ff5722' }}>ICCR SCHOLARSHIPS</span>
                                            </h2>
                                        </div>
                                        <div className="text-muted" style={{ lineHeight: '1.8' }}>
                                            <p className="lead">
                                                The Government of India offer Scholarships to Malagasy and Comorian students through Indian Council for Cultural Relations (ICCR) under Africa Scholarship Scheme to follow Undergraduate, Postgraduate, M. Phil. /Ph.D. course in various reputed Indian Universities/Institutes.
                                            </p>
                                            <p>
                                                The Scholarship is given for various courses: Agriculture, Commerce and Management, Engineering, Applied course (Journalism and Communication, Tourism Management, Pharmacy, Computer Application, etc…).
                                            </p>
                                            <p>
                                                The applications from interested students for the academic year 2025-26. The last date of online application is on 31 May 2025.
                                            </p>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-muted mb-0">
                                                At <span style={{ color: '#1a1a1a', fontWeight: '600' }}>India Educates</span>,
                                                we guide you through every step of your educational journey.
                                            </p>
                                        </div>
                                    </Card.Body>
                                </Col>
                                <Col md={4}>
                                    <div style={{
                                        position: 'relative',
                                        height: '100%',
                                        backgroundImage: 'url("/images/Indiaeducates.jpg")',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        padding: '20px',
                                        borderRadius: '0 10px 10px 0'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: 'rgba(0, 0, 0, 0.62)',
                                            borderRadius: '0 10px 10px 0'
                                        }} />
                                        <img
                                            src="/images/IndiaEducatesLogo1.png"
                                            alt="Indian Education"
                                            style={{
                                                width: '90%',
                                                height: '90%',
                                                objectFit: 'contain',
                                                position: 'relative',
                                                zIndex: 2,
                                                display: 'block',
                                                margin: 'auto',
                                                filter: 'drop-shadow(3px 3px 5px rgba(255, 255, 255, 0.49))',
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/* University Showcase */}
                <Row className="mb-5">
                    <Col md={10} className="mx-auto">
                        <div className="mb-4">
                            <h6 className="text-success mb-2" style={{ fontWeight: '600' }}>ABOUT UNIVERSITIES</h6>
                            <h2 className="mb-3" style={{
                                color: '#1a1a1a',
                                fontWeight: '700',
                                fontSize: '2rem'
                            }}>
                                INTRODUCTION TO<br />
                                <span style={{ color: '#ff5722' }}>PREMIER INDIAN UNIVERSITIES</span>
                            </h2>
                        </div>
                        <Row className="g-4">
                            {[1, 2, 3, 4].map((num) => (
                                <Col md={3} key={num}>
                                    <div className="position-relative" style={{
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                        height: '300px'
                                    }}>
                                        <img
                                            src={`/images/university-${num}.jpg`}
                                            alt={`University ${num}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                                            padding: '30px 20px 15px',
                                            color: 'white'
                                        }}>
                                            <h5 className="mb-2">University {num}</h5>
                                            <p className="mb-0" style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                                                Excellence in higher education
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>

                {/* Eligibility Criteria with Image */}
                <Row className="mb-5">
                    <Col md={10} className="mx-auto">
                        <Card className="border-0" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9f2ff 100%)' }}>
                            <Row className="g-0">
                                <Col md={4}>
                                    <img
                                        src="/images/eligibility.jpg"
                                        alt="Eligibility"
                                        className="img-fluid h-100"
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: '10px 0 0 10px'
                                        }}
                                    />
                                </Col>
                                <Col md={8}>
                                    <Card.Body className="p-4">
                                        <div className="mb-4">
                                            <h6 className="text-success mb-2" style={{ fontWeight: '600' }}>ABOUT ELIGIBILITY</h6>
                                            <h2 className="mb-3" style={{
                                                color: '#1a1a1a',
                                                fontWeight: '700',
                                                fontSize: '2rem'
                                            }}>
                                                EMPOWERING FUTURES WITH<br />
                                                <span style={{ color: '#ff5722' }}>ELIGIBILITY CRITERIA</span>
                                            </h2>
                                        </div>
                                        <div className="text-muted" style={{ lineHeight: '1.8' }}>
                                            <ul className="list-unstyled">
                                                <li className="mb-3 d-flex align-items-start">
                                                    {/* <CheckSquareFill className="me-2 mt-1" style={{ color: '#ff5722', flexShrink: 0 }} /> */}
                                                    <img src="/images/image.png" style={{ width: '20px', height: '20px' }} className="me-2 mt-1" />
                                                    <span>Candidates must achieve adequate level of English Proficiency as medium of instruction in India is English.</span>
                                                </li>
                                                <li className="mb-3 d-flex align-items-start">
                                                    {/* <CheckSquareFill className="me-2 mt-1" style={{ color: '#ff5722', flexShrink: 0 }} /> */}
                                                    <img src="/images/image.png" style={{ width: '20px', height: '20px' }} className="me-2 mt-1" />
                                                    <span>Age Requirements:
                                                        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                                                            <li className="d-flex align-items-start">
                                                                {/* <CheckSquareFill className="me-2 mt-1" style={{ color: '#ff5722', flexShrink: 0 }} /> */}
                                                                <span className="me-2 text-success">•</span>
                                                                <span> Between 18 and 30 years old for Undergraduate/Postgraduate courses</span>
                                                            </li>
                                                            <li className="d-flex align-items-start">
                                                                {/* <CheckSquareFill className="me-2 mt-1" style={{ color: '#ff5722', flexShrink: 0 }} /> */}
                                                                <span className="me-2 text-success">•</span>
                                                                <span> Between 18 and 45 years old for PhD Programmes</span>
                                                            </li>
                                                        </ul>
                                                    </span>
                                                </li>
                                                <li className="mb-3 d-flex align-items-start">
                                                    {/* <CheckSquareFill className="me-2 mt-1" style={{ color: '#ff5722', flexShrink: 0 }} /> */}
                                                    <img src="/images/image.png" style={{ width: '20px', height: '20px' }} className="me-2 mt-1" />
                                                    <span>Candidates must be fully fit to be able to stay and complete his/her course in India.</span>
                                                </li>
                                                <li className="mb-3 d-flex align-items-start">
                                                    {/* <CheckSquareFill className="me-2 mt-1" style={{ color: '#ff5722', flexShrink: 0 }} /> */}
                                                    <img src="/images/image.png" style={{ width: '20px', height: '20px' }} className="me-2 mt-1" />
                                                    <span>Candidates must possess all required supporting documents.</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-muted mb-0">
                                                At <span style={{ color: '#1a1a1a', fontWeight: '600' }}>India Educates</span>,
                                                we are dedicated to guiding students toward their academic and career aspirations.
                                            </p>
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/* Course Categories with Icons */}
                <Row className="mb-5">
                    <Col md={10} className="mx-auto">

                        <div className="mb-4">
                            <h6 className="text-success mb-2" style={{ fontWeight: '600' }}>ABOUT COURSES</h6>
                            <h2 className="mb-3" style={{
                                color: '#1a1a1a',
                                fontWeight: '700',
                                fontSize: '2rem'
                            }}>
                                EXPLORE OUR<br />
                                <span style={{ color: '#ff5722' }}>AVAILABLE COURSES</span>
                            </h2>
                        </div>
                        <Row className="g-4">
                            {[
                                { name: 'Agriculture', img: 'agriculture.jpg' },
                                { name: 'Engineering', img: 'engineering.jpg' },
                                { name: 'Management', img: 'management.jpg' },
                                { name: 'Computer Science', img: 'computer-science.jpg' },
                                { name: 'Pharmacy', img: 'pharmacy.jpg' },
                                { name: 'Tourism', img: 'tourism.jpg' }
                            ].map((course, idx) => (
                                <Col md={4} key={idx}>
                                    <div className="position-relative" style={{
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                    }}>
                                        {/* Dark overlay for entire image */}
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: 'rgba(0, 0, 0, 0.39)',
                                            zIndex: 1
                                        }} />
                                        <img
                                            src={`/images/${course.img}`}
                                            alt={course.name}
                                            style={{
                                                width: '100%',
                                                height: '300px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                                            padding: '30px 20px 20px',
                                            color: 'white',
                                            zIndex: 2
                                        }}>
                                            <h5 className="mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                                                {course.name}
                                            </h5>
                                            <p className="mb-0" style={{
                                                fontSize: '0.9rem',
                                                opacity: 0.9,
                                                textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
                                            }}>
                                                For {course.name.toLowerCase()} professionals, we offer specialized programs and courses.
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>

                    </Col>
                </Row>

                {/* Required Documents */}
                <Row className="mb-5">
                    <Col md={10} className="mx-auto">
                        <Card className="border-0" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9f2ff 100%)' }}>
                            <Row className="g-0">

                                <Col md={8}>
                                    <Card.Body className="p-4">
                                        <div className="mb-4">
                                            <h6 className="text-success mb-2" style={{ fontWeight: '600' }}>ABOUT DOCUMENTS</h6>
                                            <h2 className="mb-3" style={{
                                                color: '#1a1a1a',
                                                fontWeight: '700',
                                                fontSize: '2rem'
                                            }}>
                                                ESSENTIAL DOCUMENTS FOR<br />
                                                <span style={{ color: '#ff5722' }}>YOUR APPLICATION</span>
                                            </h2>
                                        </div>
                                        <div className="text-muted" style={{ lineHeight: '1.8' }}>
                                            <ul className="list-unstyled">
                                                {[
                                                    'All academic certificates and mark sheet from grade 10 with certified English translation attested by the Ministry of Foreign Affairs, if the original documents are not in English.',
                                                    'TOEFEL/IELTS and other standardized test scores, if available.',
                                                    'Recommendations/character certificates from existing school/University etc.',
                                                    'Certified copy of valid passport. (Passport should be valid for the duration of the course applied for.)',
                                                    'GMAT score for Commerce and Management course. (If required by the University)',
                                                    'A certificate of physical fitness dully filled by a sworn Doctor.',
                                                    'Synopsis details only for Ph.D. candidates.'
                                                ].map((item, index) => (
                                                    <li key={index} className="mb-3 d-flex align-items-start">
                                                        <img src="/images/image.png" style={{ width: '20px', height: '20px' }} className="me-2 mt-1" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-muted mb-0">
                                                At <span style={{ color: '#1a1a1a', fontWeight: '600' }}>India Educates</span>,
                                                we ensure a smooth application process for all candidates.
                                            </p>
                                        </div>
                                    </Card.Body>
                                </Col>
                                <Col md={4}>
                                    <img
                                        src="/images/documents.jpg"
                                        alt="Required Documents"
                                        className="img-fluid h-100"
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: '0 10px 10px 0'
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/* General Information */}
                <Row className="mb-5">
                    <Col md={10} className="mx-auto">
                        <Card className="border-0" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9f2ff 100%)' }}>
                            <Row className="g-0">
                                <Col md={4}>
                                    <img
                                        src="/images/general-info.jpg"
                                        alt="General Information"
                                        className="img-fluid h-100"
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: '10px 0 0 10px'
                                        }}
                                    />
                                </Col>
                                <Col md={8}>
                                    <Card.Body className="p-4">
                                        <div className="mb-4">
                                            <h6 className="text-success mb-2" style={{ fontWeight: '600' }}>ABOUT INFORMATION</h6>
                                            <h2 className="mb-3" style={{
                                                color: '#1a1a1a',
                                                fontWeight: '700',
                                                fontSize: '2rem'
                                            }}>
                                                IMPORTANT GUIDELINES FOR<br />
                                                <span style={{ color: '#ff5722' }}>YOUR APPLICATION</span>
                                            </h2>
                                        </div>
                                        <div className="text-muted" style={{ lineHeight: '1.8' }}>
                                            <ul className="list-unstyled">
                                                {[
                                                    'Online application should be complete in all respects, with all the required information and all necessary supporting documents. Any incomplete application will not be processed further.',
                                                    'The application will not be considered without English translation of documents if the original documents are not in English.',
                                                    'Applicants have the option to apply to 5 Universities/Institutes in the order of their preference of study.',
                                                    'Students should submit a 500-word essay in English to ascertain English proficiency while applying online.',
                                                    'In case of engineering courses, students must have Physics, Chemistry & Mathematics in their school leaving examinations.',
                                                    'For the academic year 2025-26, admissions in Medical/ Paramedical (Nursing / Physiotherapy / anesthesia etc.,) / fashion / law courses / integrated courses such as BALLB (5 Years) / B.Sc. & M.Sc. (5 Years) etc. are not admissible.',
                                                    'Admission of student on the basis of eligibility from one or more than one Indian University does not guarantee award of ICCR sponsored scholarship. Indian Mission will decide on the award of scholarship to applicant and letter of award of scholarship will be issued to student. For award of scholarship the decision of Indian Mission is final and any query regarding it should be taken up with Indian Mission only.'
                                                ].map((item, index) => (
                                                    <li key={index} className="mb-3 d-flex align-items-start">
                                                        <img src="/images/image.png" style={{ width: '20px', height: '20px' }} className="me-2 mt-1" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-muted mb-0">
                                                At <span style={{ color: '#1a1a1a', fontWeight: '600' }}>India Educates</span>,
                                                we ensure clear communication of all requirements.
                                            </p>
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/* For Selected Students */}
                <Row className="mb-5">
                    <Col md={10} className="mx-auto">
                        <Card className="bg-warning-subtle border-0">
                            <Card.Body className="p-4">
                                <div className="mb-4">
                                    <h6 className="text-success mb-2" style={{ fontWeight: '600' }}>FOR SELECTED CANDIDATES</h6>
                                    <h2 className="mb-3" style={{
                                        color: '#1a1a1a',
                                        fontWeight: '700',
                                        fontSize: '2rem'
                                    }}>
                                        IMPORTANT INFORMATION FOR<br />
                                        <span style={{ color: '#ff5722' }}>SELECTED STUDENTS</span>
                                    </h2>
                                </div>
                                <div className="text-muted" style={{ lineHeight: '1.8' }}>
                                    <ul className="list-unstyled">
                                        {[
                                            'Selected students are advised to carry some money to meet incidental expenses on arrival to India. A minimum of INR 60,000/- is recommended. (Equivalent to 700 $)',
                                            'For Science courses, the expenditure on laboratory chemicals and other related incidental charges for students pursuing science and agriculture courses will have to be borne by the students themselves.',
                                            'It is compulsory for all ICCR scholarship students to procure Medical Insurance policy with minimum sum assured for Indian Rupees 500,000 per annum. Student must have medical insurance coverage on their own either before travel or immediately after reaching India, whichever is convenient. Students can purchase medical insurance from any of the insurance companies of their choice.'
                                        ].map((item, index) => (
                                            <li key={index} className="mb-3 d-flex align-items-start">
                                                <img src="/images/image.png" style={{ width: '20px', height: '20px' }} className="me-2 mt-1" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-4">
                                    <p className="text-muted mb-0">
                                        At <span style={{ color: '#1a1a1a', fontWeight: '600' }}>India Educates</span>,
                                        we ensure all selected students are well-prepared for their journey.
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Application Form */}
                <Row className="mb-5">
                    <Col md={10} className="mx-auto">
                        <Card className="border-0" style={{
                            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9f2ff 100%)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            borderRadius: '15px'
                        }}>
                            <Card.Body className="p-4" id="application-form">
                                <div className="mb-5 text-center">
                                    <h6 className="text-success mb-2" style={{
                                        fontWeight: '600',
                                        letterSpacing: '1.5px',
                                        textTransform: 'uppercase'
                                    }}>APPLICATION PROCESS</h6>
                                    <h2 className="mb-3" style={{
                                        color: '#1a1a1a',
                                        fontWeight: '700',
                                        fontSize: '2.5rem',
                                        lineHeight: '1.3'
                                    }}>
                                        START YOUR JOURNEY WITH<br />
                                        <span style={{
                                            color: '#ff5722',
                                            position: 'relative',
                                            display: 'inline-block'
                                        }}>
                                            ICCR SCHOLARSHIP
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '-5px',
                                                left: '0',
                                                width: '100%',
                                                height: '4px',
                                                background: 'rgba(255,87,34,0.2)',
                                                borderRadius: '2px'
                                            }}></div>
                                        </span>
                                    </h2>
                                    <p className="text-muted" style={{
                                        maxWidth: '600px',
                                        margin: '0 auto',
                                        fontSize: '1.1rem',
                                        lineHeight: '1.6'
                                    }}>
                                        Fill out the application form below with accurate information to begin your educational journey in India.
                                    </p>
                                </div>

                                <Form onSubmit={handleSubmit}>
                                    <Row className="g-4">
                                        {/* Personal Information Card */}
                                        <Col md={12}>
                                            <Card className="border-0 shadow-sm mb-4" style={{
                                                borderRadius: '12px',
                                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                            }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                                                }}>
                                                <Card.Body className="p-4">
                                                    <div className="d-flex align-items-center mb-4">
                                                        <div className="me-3" style={{
                                                            width: '40px',
                                                            height: '40px',
                                                            borderRadius: '50%',
                                                            background: 'rgba(40,167,69,0.1)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>
                                                            <PersonCheckFill className="text-success" style={{ fontSize: '1.2rem' }} />
                                                        </div>
                                                        <h5 style={{
                                                            color: '#1a1a1a',
                                                            fontWeight: '600',
                                                            margin: '0'
                                                        }}>
                                                            Personal Information
                                                        </h5>
                                                    </div>

                                                    {/* Existing form fields with enhanced styling */}
                                                    <style>
                                                        {`
                                                            .form-control, .form-select {
                                                                border: 1px solid #e0e0e0;
                                                                border-radius: 8px;
                                                                padding: 12px 15px;
                                                                transition: all 0.3s ease;
                                                                background-color: #f8f9fa;
                                                            }
                                                            
                                                            .form-control:focus, .form-select:focus {
                                                                border-color: #28a745;
                                                                box-shadow: 0 0 0 0.2rem rgba(40,167,69,0.15);
                                                                background-color: #fff;
                                                            }

                                                            .form-label {
                                                                color: #495057;
                                                                margin-bottom: 8px;
                                                                font-size: 0.9rem;
                                                            }

                                                            .alert {
                                                                border-radius: 10px;
                                                                border: none;
                                                                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                                                            }
                                                        `}
                                                    </style>

                                                    {/* Keep existing form fields */}
                                                    <Row className="g-3">
                                                        {/* Basic Personal Details */}
                                                        <Col md={10}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Full Name (IN BLOCK LETTERS) <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="fullName"
                                                                    value={formData.fullName}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                    placeholder="JOHN DOE"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        {/* Photo Upload Section */}
                                                        <Col md={2}>
                                                            <div className="d-flex align-items-start">
                                                                <div className="me-4" style={{ width: '200px' }}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Student Photo</Form.Label>
                                                                        <div
                                                                            onClick={() => document.getElementById('photoUpload').click()}
                                                                            style={{
                                                                                width: '100px',
                                                                                height: '100px',
                                                                                border: '2px dashed #ddd',
                                                                                borderRadius: '10px',
                                                                                overflow: 'hidden',
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                backgroundColor: '#f8f9fa',
                                                                                marginBottom: '10px',
                                                                                cursor: 'pointer',
                                                                                transition: 'all 0.3s ease',
                                                                                position: 'relative'
                                                                            }}
                                                                            onMouseOver={(e) => {
                                                                                e.currentTarget.style.borderColor = '#28a745';
                                                                                e.currentTarget.style.backgroundColor = '#f0f9f2';
                                                                            }}
                                                                            onMouseOut={(e) => {
                                                                                e.currentTarget.style.borderColor = '#ddd';
                                                                                e.currentTarget.style.backgroundColor = '#f8f9fa';
                                                                            }}
                                                                        >
                                                                            {formData.studentPhoto ? (
                                                                                <>
                                                                                    <img
                                                                                        src={formData.studentPhoto}
                                                                                        alt="Student"
                                                                                        style={{
                                                                                            width: '100%',
                                                                                            height: '100%',
                                                                                            objectFit: 'cover'
                                                                                        }}
                                                                                    />
                                                                                    <div style={{
                                                                                        position: 'absolute',
                                                                                        top: 0,
                                                                                        left: 0,
                                                                                        right: 0,
                                                                                        bottom: 0,
                                                                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        justifyContent: 'center',
                                                                                        opacity: 0,
                                                                                        transition: 'opacity 0.3s ease',
                                                                                    }}
                                                                                        onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                                                                                        onMouseOut={(e) => e.currentTarget.style.opacity = '0'}
                                                                                    >
                                                                                        <p className="text-white mb-0" style={{ fontSize: '0.8rem' }}>Change Photo</p>
                                                                                    </div>
                                                                                </>
                                                                            ) : (
                                                                                <div className="text-center p-3">
                                                                                    <i className="bi bi-camera" style={{ fontSize: '2rem', color: '#aaa' }}></i>
                                                                                    <p className="text-muted mb-0 mt-2" style={{ fontSize: '0.8rem' }}>
                                                                                        Upload Photo
                                                                                    </p>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <Form.Control
                                                                            id="photoUpload"
                                                                            type="file"
                                                                            accept="image/*"
                                                                            onChange={handlePhotoUpload}
                                                                            required
                                                                            className="py-2"
                                                                            style={{ display: 'none' }}
                                                                        />
                                                                        {/* <Form.Text className="text-muted d-block">
                                                                             (max 1MB)
                                                                        </Form.Text> */}
                                                                    </Form.Group>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        {/* Personal Details Row 1 */}
                                                        <Col md={4}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Date of Birth <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="date"
                                                                    name="dateOfBirth"
                                                                    value={formData.dateOfBirth}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Gender <span className="text-danger">*</span></Form.Label>
                                                                <Form.Select
                                                                    name="gender"
                                                                    value={formData.gender}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                >
                                                                    <option value="">Select Gender</option>
                                                                    <option value="male">Male</option>
                                                                    <option value="female">Female</option>
                                                                    <option value="other">Other</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Place of Birth <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="placeOfBirth"
                                                                    value={formData.placeOfBirth}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                    placeholder="City, Country"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        {/* Contact Information */}
                                                        <Col md={4}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Mobile Number <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="tel"
                                                                    name="mobileNumber"
                                                                    value={formData.mobileNumber}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                    placeholder="+220263765"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">WhatsApp Number</Form.Label>
                                                                <Form.Control
                                                                    type="tel"
                                                                    name="whatsappNumber"
                                                                    value={formData.whatsappNumber}
                                                                    onChange={handleChange}
                                                                    className="py-2"
                                                                    placeholder="+220263765"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Email ID <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="email"
                                                                    name="email"
                                                                    value={formData.email}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                    placeholder="example@email.com"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        {/* Passport Information */}
                                                        <Col md={12}>
                                                            <h6 className="mb-3 mt-2 text-success">Passport Details</h6>
                                                        </Col>
                                                        <Col md={3}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Passport No <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="passport"
                                                                    value={formData.passport}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                    placeholder="AB1234567"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={3}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Issue Place <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="passportCountry"
                                                                    value={formData.passportCountry}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                    placeholder="City, Country"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={3}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Issue Date <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="date"
                                                                    name="passportIssueDate"
                                                                    value={formData.passportIssueDate}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={3}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Expiry Date <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="date"
                                                                    name="passportExpiryDate"
                                                                    value={formData.passportExpiryDate}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        {/* Address Information */}
                                                        <Col md={12}>
                                                            <h6 className="mb-3 mt-2 text-success">Postal Address</h6>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Address Line <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="addressLine"
                                                                    value={formData.addressLine}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                    placeholder="Street Address"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={3}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">City <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="city"
                                                                    value={formData.city}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                    placeholder="City"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={3}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">State/Province <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="state"
                                                                    value={formData.state}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                    placeholder="State"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={3}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Country <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="addressCountry"
                                                                    value={formData.addressCountry}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                    placeholder="Country"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={3}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Zipcode <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="zipcode"
                                                                    value={formData.zipcode}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                    placeholder="123456"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={12}>
                                                            <h6 className="mb-3 mt-2">Details of Father/Mother</h6>
                                                            <Row className="g-3">
                                                                <Col md={4}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Father's Name</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            name="fatherName"
                                                                            value={formData.fatherName}
                                                                            onChange={handleChange}
                                                                            required
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Father's Phone Number</Form.Label>
                                                                        <Form.Control
                                                                            type="tel"
                                                                            name="fatherPhone"
                                                                            value={formData.fatherPhone}
                                                                            onChange={handleChange}
                                                                            required
                                                                            className="py-2"
                                                                            placeholder="+220263765"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Father's Email</Form.Label>
                                                                        <Form.Control
                                                                            type="email"
                                                                            name="fatherEmail"
                                                                            value={formData.fatherEmail}
                                                                            onChange={handleChange}
                                                                            required
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Mother's Name</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            name="motherName"
                                                                            value={formData.motherName}
                                                                            onChange={handleChange}
                                                                            required
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Mother's Phone Number</Form.Label>
                                                                        <Form.Control
                                                                            type="tel"
                                                                            name="motherPhone"
                                                                            value={formData.motherPhone}
                                                                            onChange={handleChange}
                                                                            required
                                                                            className="py-2"
                                                                            placeholder="+220263765"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Mother's Email</Form.Label>
                                                                        <Form.Control
                                                                            type="email"
                                                                            name="motherEmail"
                                                                            value={formData.motherEmail}
                                                                            onChange={handleChange}
                                                                            required
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col md={12}>
                                                            <h6 className="mb-3 mt-2">English Proficiency</h6>
                                                            <Row className="g-3">
                                                                <Col md={4}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">English Proficiency - I</Form.Label>
                                                                        <Form.Select
                                                                            name="englishProficiency1"
                                                                            value={formData.englishProficiency1}
                                                                            onChange={handleChange}
                                                                            required
                                                                            className="py-2"
                                                                        >
                                                                            <option value="">Select</option>
                                                                            <option value="yes">Yes</option>
                                                                            <option value="no">No</option>
                                                                        </Form.Select>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Till What Level</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            name="proficiencyLevel"
                                                                            value={formData.proficiencyLevel}
                                                                            onChange={handleChange}
                                                                            placeholder="1"
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={4}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Score/Percentage</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            name="proficiencyScore"
                                                                            value={formData.proficiencyScore}
                                                                            onChange={handleChange}
                                                                            placeholder="60"
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={3}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">English Proficiency - II</Form.Label>
                                                                        <Form.Select
                                                                            name="englishProficiency2"
                                                                            value={formData.englishProficiency2}
                                                                            onChange={handleChange}
                                                                            className="py-2"
                                                                        >
                                                                            <option value="">Select</option>
                                                                            <option value="yes">Yes</option>
                                                                            <option value="no">No</option>
                                                                        </Form.Select>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={3}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">TOEFL Score</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            name="toeflScore"
                                                                            value={formData.toeflScore}
                                                                            onChange={handleChange}
                                                                            placeholder="NA"
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={3}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">IELTS Score</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            name="ieltsScore"
                                                                            value={formData.ieltsScore}
                                                                            onChange={handleChange}
                                                                            placeholder="NA"
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={3}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Duolingo Score</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            name="duolingoScore"
                                                                            value={formData.duolingoScore}
                                                                            onChange={handleChange}
                                                                            placeholder="NA"
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col md={12}>
                                                            <h6 className="mb-3 mt-2">Previous Educational Qualifications</h6>
                                                            <div className="table-responsive">
                                                                <table className="table table-bordered">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Certificate/Degree</th>
                                                                            <th>Country</th>
                                                                            <th>Board Name</th>
                                                                            <th>Name of School/University/Board</th>
                                                                            <th>Subjects Covered</th>
                                                                            <th>Year</th>
                                                                            <th>Percentage(%)/Grade</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {formData.educationalQualifications.map((qual, index) => (
                                                                            <tr key={index}>
                                                                                <td>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        value={qual.certificate}
                                                                                        onChange={(e) => handleQualificationChange(index, 'certificate', e.target.value)}
                                                                                        placeholder={`e.g., Grade ${index + 10}`}
                                                                                        className="py-2"
                                                                                    />
                                                                                    <small className="text-muted">
                                                                                        (equivalent to Grade {index + 10} in India)
                                                                                    </small>
                                                                                </td>
                                                                                <td>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        value={qual.country}
                                                                                        onChange={(e) => handleQualificationChange(index, 'country', e.target.value)}
                                                                                        className="py-2"
                                                                                    />
                                                                                </td>
                                                                                <td>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        value={qual.boardName}
                                                                                        onChange={(e) => handleQualificationChange(index, 'boardName', e.target.value)}
                                                                                        className="py-2"
                                                                                    />
                                                                                </td>
                                                                                <td>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        value={qual.schoolName}
                                                                                        onChange={(e) => handleQualificationChange(index, 'schoolName', e.target.value)}
                                                                                        className="py-2"
                                                                                    />
                                                                                </td>
                                                                                <td>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        value={qual.subjects}
                                                                                        onChange={(e) => handleQualificationChange(index, 'subjects', e.target.value)}
                                                                                        className="py-2"
                                                                                    />
                                                                                </td>
                                                                                <td>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        value={qual.year}
                                                                                        onChange={(e) => handleQualificationChange(index, 'year', e.target.value)}
                                                                                        className="py-2"
                                                                                    />
                                                                                </td>
                                                                                <td>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        value={qual.percentage}
                                                                                        onChange={(e) => handleQualificationChange(index, 'percentage', e.target.value)}
                                                                                        className="py-2"
                                                                                    />
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                            {/* Add Qualification Button */}
                                                            <div className="text-center mt-3">
                                                                <Button
                                                                    onClick={handleAddQualification}
                                                                    variant="outline-success"
                                                                    className="px-4 py-2"
                                                                    style={{
                                                                        borderRadius: '50px',
                                                                        transition: 'all 0.3s ease'
                                                                    }}
                                                                    onMouseOver={(e) => {
                                                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                                                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(40,167,69,0.2)';
                                                                    }}
                                                                    onMouseOut={(e) => {
                                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                                        e.currentTarget.style.boxShadow = 'none';
                                                                    }}
                                                                >
                                                                    <i className="bi bi-plus-circle me-2"></i>
                                                                    Add Another Qualification
                                                                </Button>
                                                            </div>
                                                        </Col>
                                                        <Col md={12}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Essay</Form.Label>
                                                                <Form.Control
                                                                    as="textarea"
                                                                    rows={5}
                                                                    name="essay"
                                                                    value={formData.essay}
                                                                    onChange={handleChange}
                                                                    placeholder="NA"
                                                                    className="py-2"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Academic Year</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="academicYear"
                                                                    value={formData.academicYear}
                                                                    onChange={handleChange}
                                                                    placeholder="2025"
                                                                    className="py-2"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Level of Course</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="levelOfCourse"
                                                                    value={formData.levelOfCourse}
                                                                    onChange={handleChange}
                                                                    placeholder="UG/PG"
                                                                    className="py-2"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Course Main Stream</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="courseMainStream"
                                                                    value={formData.courseMainStream}
                                                                    onChange={handleChange}
                                                                    placeholder="Science/Commerce/Arts"
                                                                    className="py-2"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col md={12}>
                                            <Card className="border-0 shadow-sm mb-4">
                                                <Card.Body>
                                                    <h5 className="mb-4" style={{ color: '#1a1a1a', fontWeight: '600' }}>
                                                        <PersonCheckFill className="me-2 text-success" />
                                                        University Preferences
                                                    </h5>
                                                    <div className="alert alert-warning">
                                                        <small>Note: Once admission is confirmed, no change in either course or University/Institute will be permitted by the Council. Allotment of colleges is done by the respective Universities.</small>
                                                    </div>
                                                    {formData.universities.map((_, index) => (
                                                        <Row className="g-3 mb-3" key={index}>
                                                            <Col md={2}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Preference {index + 1}</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={index + 1}
                                                                        disabled
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={4}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">University</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name={`universities-${index}`}
                                                                        value={formData.universities[index]}
                                                                        onChange={(e) => {
                                                                            const newUniversities = [...formData.universities];
                                                                            newUniversities[index] = e.target.value;
                                                                            setFormData(prev => ({
                                                                                ...prev,
                                                                                universities: newUniversities
                                                                            }));
                                                                        }}
                                                                        required
                                                                        className="py-2"
                                                                        placeholder="Enter university name"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Course Stream</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name={`courseStreams-${index}`}
                                                                        value={formData.courseStreams[index]}
                                                                        onChange={(e) => {
                                                                            const newStreams = [...formData.courseStreams];
                                                                            newStreams[index] = e.target.value;
                                                                            setFormData(prev => ({
                                                                                ...prev,
                                                                                courseStreams: newStreams
                                                                            }));
                                                                        }}
                                                                        required
                                                                        className="py-2"
                                                                        placeholder="e.g., Management and Business Administration"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Subject</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name={`subjects-${index}`}
                                                                        value={formData.subjects[index]}
                                                                        onChange={(e) => {
                                                                            const newSubjects = [...formData.subjects];
                                                                            newSubjects[index] = e.target.value;
                                                                            setFormData(prev => ({
                                                                                ...prev,
                                                                                subjects: newSubjects
                                                                            }));
                                                                        }}
                                                                        required
                                                                        className="py-2"
                                                                        placeholder="e.g., Supply Chain"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    ))}

                                                    {/* Add Preference Button */}
                                                    {formData.universities.length < 5 && (
                                                        <div className="text-center mt-3">
                                                            <Button
                                                                onClick={handleAddPreference}
                                                                variant="outline-success"
                                                                className="px-4 py-2"
                                                                style={{
                                                                    borderRadius: '50px',
                                                                    transition: 'all 0.3s ease'
                                                                }}
                                                                onMouseOver={(e) => {
                                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(40,167,69,0.2)';
                                                                }}
                                                                onMouseOut={(e) => {
                                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                                    e.currentTarget.style.boxShadow = 'none';
                                                                }}
                                                            >
                                                                <i className="bi bi-plus-circle me-2"></i>
                                                                Add Another Preference
                                                            </Button>
                                                        </div>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col md={12}>
                                            <Card className="border-0 shadow-sm mb-4">
                                                <Card.Body>
                                                    <h5 className="mb-4" style={{ color: '#1a1a1a', fontWeight: '600' }}>
                                                        <PersonCheckFill className="me-2 text-success" />
                                                        References
                                                    </h5>
                                                    <div className="alert alert-info">
                                                        <small>Give below the names of two persons who have agreed to testify from their personal knowledge to your character (they must not be related to you and should have direct knowledge of your academic pursuits).</small>
                                                    </div>
                                                    {formData.references.map((reference, index) => (
                                                        <div key={index} className="mb-4">
                                                            <h6 className="mb-3">Reference {index + 1}</h6>
                                                            <Row className="g-3">
                                                                <Col md={3}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Name</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            value={reference.name}
                                                                            onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                                                                            required
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={2}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Occupation</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            value={reference.occupation}
                                                                            onChange={(e) => handleReferenceChange(index, 'occupation', e.target.value)}
                                                                            required
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={3}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Email</Form.Label>
                                                                        <Form.Control
                                                                            type="email"
                                                                            value={reference.email}
                                                                            onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                                                                            required
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={2}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Telephone</Form.Label>
                                                                        <Form.Control
                                                                            type="tel"
                                                                            value={reference.telephone}
                                                                            onChange={(e) => handleReferenceChange(index, 'telephone', e.target.value)}
                                                                            required
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={2}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Postal Address</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            value={reference.postalAddress}
                                                                            onChange={(e) => handleReferenceChange(index, 'postalAddress', e.target.value)}
                                                                            required
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    ))}

                                                    {/* Add Reference Button */}
                                                    {formData.references.length < 5 && (
                                                        <div className="text-center mt-3">
                                                            <Button
                                                                onClick={handleAddReference}
                                                                variant="outline-success"
                                                                className="px-4 py-2"
                                                                style={{
                                                                    borderRadius: '50px',
                                                                    transition: 'all 0.3s ease'
                                                                }}
                                                                onMouseOver={(e) => {
                                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(40,167,69,0.2)';
                                                                }}
                                                                onMouseOut={(e) => {
                                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                                    e.currentTarget.style.boxShadow = 'none';
                                                                }}
                                                            >
                                                                <i className="bi bi-plus-circle me-2"></i>
                                                                Add Another Reference
                                                            </Button>
                                                        </div>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        {/* Add this section after References and before Submit button */}
                                        <Col md={12}>
                                            <Card className="border-0 shadow-sm mb-4">
                                                <Card.Body>
                                                    <h5 className="mb-4" style={{ color: '#1a1a1a', fontWeight: '600' }}>
                                                        <PersonCheckFill className="me-2 text-success" />
                                                        Details of Close Relative(s) or Friends in India
                                                    </h5>
                                                    {formData.indianContacts.map((contact, index) => (
                                                        <div key={index} className="mb-4">
                                                            <h6 className="mb-3">Contact {index + 1}</h6>
                                                            <Row className="g-3">
                                                                <Col md={2}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Name</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            value={contact.name}
                                                                            onChange={(e) => handleIndianContactChange(index, 'name', e.target.value)}
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={2}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Relationship</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            value={contact.relationship}
                                                                            onChange={(e) => handleIndianContactChange(index, 'relationship', e.target.value)}
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={2}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Occupation</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            value={contact.occupation}
                                                                            onChange={(e) => handleIndianContactChange(index, 'occupation', e.target.value)}
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={2}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Telephone</Form.Label>
                                                                        <Form.Control
                                                                            type="tel"
                                                                            value={contact.telephone}
                                                                            onChange={(e) => handleIndianContactChange(index, 'telephone', e.target.value)}
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={2}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Email</Form.Label>
                                                                        <Form.Control
                                                                            type="email"
                                                                            value={contact.email}
                                                                            onChange={(e) => handleIndianContactChange(index, 'email', e.target.value)}
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={2}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Postal Address</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            value={contact.postalAddress}
                                                                            onChange={(e) => handleIndianContactChange(index, 'postalAddress', e.target.value)}
                                                                            className="py-2"
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    ))}

                                                    {/* Add Contact Button */}
                                                    {formData.indianContacts.length < 5 && (
                                                        <div className="text-center mt-3">
                                                            <Button
                                                                onClick={handleAddIndianContact}
                                                                variant="outline-success"
                                                                className="px-4 py-2"
                                                                style={{
                                                                    borderRadius: '50px',
                                                                    transition: 'all 0.3s ease'
                                                                }}
                                                                onMouseOver={(e) => {
                                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(40,167,69,0.2)';
                                                                }}
                                                                onMouseOut={(e) => {
                                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                                    e.currentTarget.style.boxShadow = 'none';
                                                                }}
                                                            >
                                                                <i className="bi bi-plus-circle me-2"></i>
                                                                Add Another Contact
                                                            </Button>
                                                        </div>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        {/* Add this section before the Submit button */}
                                        <Col md={12}>
                                            <Card className="border-0 shadow-sm mb-4">
                                                <Card.Body>
                                                    <h5 className="mb-4" style={{ color: '#1a1a1a', fontWeight: '600' }}>
                                                        <PersonCheckFill className="me-2 text-success" />
                                                        Additional Information
                                                    </h5>
                                                    <Row className="g-3">
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Have you travelled or lived in India in the past?</Form.Label>
                                                                <Form.Select
                                                                    name="travelledToIndia"
                                                                    value={formData.travelledToIndia}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value="yes">Yes</option>
                                                                    <option value="no">No</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Have you ever availed of ICCR Scholarship earlier?</Form.Label>
                                                                <Form.Select
                                                                    name="previousICCRScholarship"
                                                                    value={formData.previousICCRScholarship}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value="yes">Yes</option>
                                                                    <option value="no">No</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Are you currently a resident in India?</Form.Label>
                                                                <Form.Select
                                                                    name="indianResident"
                                                                    value={formData.indianResident}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value="yes">Yes</option>
                                                                    <option value="no">No</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Are you married to an Indian national?</Form.Label>
                                                                <Form.Select
                                                                    name="marriedToIndian"
                                                                    value={formData.marriedToIndian}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value="yes">Yes</option>
                                                                    <option value="no">No</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Do you have an international driving licence?</Form.Label>
                                                                <Form.Select
                                                                    name="internationalDrivingLicense"
                                                                    value={formData.internationalDrivingLicense}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value="yes">Yes</option>
                                                                    <option value="no">No</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Any Other Information:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="otherInformation"
                                                                    value={formData.otherInformation}
                                                                    onChange={handleChange}
                                                                    className="py-2"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Date</Form.Label>
                                                                <Form.Control
                                                                    type="date"
                                                                    name="declarationDate"
                                                                    value={formData.declarationDate}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Place</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="declarationPlace"
                                                                    value={formData.declarationPlace}
                                                                    onChange={handleChange}
                                                                    required
                                                                    className="py-2"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        {/* Signature Upload Section - Replace the existing signature upload code with this */}
                                                        <Col md={6}>
                                                            <div className="d-flex align-items-start">
                                                                <div className="me-4" style={{ width: '200px' }}>
                                                                    <Form.Group>
                                                                        <Form.Label className="fw-semibold">Upload Your Signature</Form.Label>
                                                                        <div
                                                                            onClick={() => document.getElementById('signatureUpload').click()}
                                                                            style={{
                                                                                width: '200px',
                                                                                height: '100px',
                                                                                border: '2px dashed #ddd',
                                                                                borderRadius: '10px',
                                                                                overflow: 'hidden',
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                backgroundColor: '#f8f9fa',
                                                                                marginBottom: '10px',
                                                                                cursor: 'pointer',
                                                                                transition: 'all 0.3s ease',
                                                                                position: 'relative'
                                                                            }}
                                                                            onMouseOver={(e) => {
                                                                                e.currentTarget.style.borderColor = '#28a745';
                                                                                e.currentTarget.style.backgroundColor = '#f0f9f2';
                                                                            }}
                                                                            onMouseOut={(e) => {
                                                                                e.currentTarget.style.borderColor = '#ddd';
                                                                                e.currentTarget.style.backgroundColor = '#f8f9fa';
                                                                            }}
                                                                        >
                                                                            {formData.signature ? (
                                                                                <>
                                                                                    <img
                                                                                        src={formData.signature}
                                                                                        alt="Signature"
                                                                                        style={{
                                                                                            width: '100%',
                                                                                            height: '100%',
                                                                                            objectFit: 'contain'
                                                                                        }}
                                                                                    />
                                                                                    <div style={{
                                                                                        position: 'absolute',
                                                                                        top: 0,
                                                                                        left: 0,
                                                                                        right: 0,
                                                                                        bottom: 0,
                                                                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        justifyContent: 'center',
                                                                                        opacity: 0,
                                                                                        transition: 'opacity 0.3s ease',
                                                                                    }}
                                                                                        onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                                                                                        onMouseOut={(e) => e.currentTarget.style.opacity = '0'}
                                                                                    >
                                                                                        <p className="text-white mb-0" style={{ fontSize: '0.8rem' }}>Change Signature</p>
                                                                                    </div>
                                                                                </>
                                                                            ) : (
                                                                                <div className="text-center p-3">
                                                                                    <i className="bi bi-pen" style={{ fontSize: '2rem', color: '#aaa' }}></i>
                                                                                    <p className="text-muted mb-0 mt-2" style={{ fontSize: '0.8rem' }}>
                                                                                        Upload Signature
                                                                                    </p>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <Form.Control
                                                                            id="signatureUpload"
                                                                            type="file"
                                                                            accept="image/*"
                                                                            onChange={handleSignatureUpload}
                                                                            required
                                                                            className="py-2"
                                                                            style={{ display: 'none' }}
                                                                        />
                                                                    </Form.Group>
                                                                </div>
                                                            </div>
                                                        </Col>

                                                        <Col md={12}>
                                                            <div className="alert alert-info">
                                                                <p className="mb-0" style={{ fontSize: '0.9rem' }}>
                                                                    I hereby declare that the particulars given above are true to the best of my knowledge and belief and that I have understood the financial terms and conditions of the Scholarship Scheme. I hereby undertake to abide by them, and I also undertake to return to my country after completion of my studies in India.
                                                                </p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        {/* Add this new section before the Submit button */}
                                        <Col md={12}>
                                            <Card className="border-0 shadow-sm mb-4">
                                                <Card.Body>
                                                    <h5 className="mb-4" style={{ color: '#1a1a1a', fontWeight: '600' }}>
                                                        <FileEarmarkTextFill className="me-2 text-success" />
                                                        Required Documents
                                                    </h5>
                                                    <div className="alert alert-info mb-4">
                                                        <small>I hereby declare that the particulars given above are true to the best of my knowledge and belief and I have understood the Terms and Conditions of the Schholarship Scheme
                                                            and hereby undertake to abide by them. I also undertake to return to my country after completion of my studies in India.Any false information given in the application will be
                                                            liable to cancellation of admission.
                                                        </small>
                                                    </div>
                                                    <Row className="g-3">
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Permanent Unique ID <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="file"
                                                                    onChange={(e) => handleDocumentUpload(e, 'permanentUniqueId')}
                                                                    required
                                                                    className="py-2"
                                                                />
                                                                <Form.Text className="text-muted">Document size must be less than 1 MB</Form.Text>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Passport Copy <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="file"
                                                                    onChange={(e) => handleDocumentUpload(e, 'passportCopy')}
                                                                    required
                                                                    className="py-2"
                                                                />
                                                                <Form.Text className="text-muted">Front & Back Pages (Document size must be less than 1 MB)</Form.Text>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Grade X Marks/Transcript <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="file"
                                                                    onChange={(e) => handleDocumentUpload(e, 'gradeXMarksheet')}
                                                                    required
                                                                    className="py-2"
                                                                />
                                                                <Form.Text className="text-muted">Document size must be less than 1 MB</Form.Text>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Grade XII Marks/Transcript <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="file"
                                                                    onChange={(e) => handleDocumentUpload(e, 'gradeXIIMarksheet')}
                                                                    required
                                                                    className="py-2"
                                                                />
                                                                <Form.Text className="text-muted">Document size must be less than 1 MB</Form.Text>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Medical Fitness Certificate <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="file"
                                                                    onChange={(e) => handleDocumentUpload(e, 'medicalFitnessCertificate')}
                                                                    required
                                                                    className="py-2"
                                                                />
                                                                <Form.Text className="text-muted">Document size must be less than 1 MB</Form.Text>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">English Translation of Documents</Form.Label>
                                                                <Form.Control
                                                                    type="file"
                                                                    onChange={(e) => handleDocumentUpload(e, 'englishTranslationOfDocuments')}
                                                                    className="py-2"
                                                                />
                                                                <Form.Text className="text-muted">For non-English documents (size must be less than 3 MB)</Form.Text>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">English as a Subject Document</Form.Label>
                                                                <Form.Control
                                                                    type="file"
                                                                    onChange={(e) => handleDocumentUpload(e, 'englishAsSubjectDocument')}
                                                                    className="py-2"
                                                                />
                                                                <Form.Text className="text-muted">Document size must be less than 700 KB</Form.Text>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Any Other Document</Form.Label>
                                                                <Form.Control
                                                                    type="file"
                                                                    onChange={(e) => handleDocumentUpload(e, 'anyOtherDocument')}
                                                                    className="py-2"
                                                                />
                                                                <Form.Text className="text-muted">Document size must be less than 3 MB</Form.Text>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        {/* Submit Button with enhanced styling */}
                                        <Col md={12} className="text-center mt-5">
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                size="lg"
                                                className="px-5 py-3 d-flex align-items-center justify-content-center mx-auto"
                                                style={{
                                                    backgroundColor: '#ff5722',
                                                    border: 'none',
                                                    borderRadius: '50px',
                                                    fontWeight: '600',
                                                    boxShadow: '0 4px 12px rgba(255,87,34,0.3)',
                                                    transition: 'all 0.3s ease',
                                                    minWidth: '250px',
                                                    position: 'relative',
                                                    overflow: 'hidden'
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                    e.currentTarget.style.boxShadow = '0 6px 15px rgba(40,167,69,0.4)';
                                                    e.currentTarget.style.backgroundColor = '#28a745';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,87,34,0.3)';
                                                    e.currentTarget.style.backgroundColor = '#ff5722';
                                                }}
                                            >
                                                <span className="me-2">{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                                                <i className="bi bi-arrow-right"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Student Life in India Gallery */}
                <Row className="mb-5">
                    <Col md={10} className="mx-auto">
                        <div className="mb-4">
                            <h6 className="text-success mb-2" style={{ fontWeight: '600' }}>STUDENT LIFE</h6>
                            <h2 className="mb-3" style={{
                                color: '#1a1a1a',
                                fontWeight: '700',
                                fontSize: '2rem'
                            }}>
                                EXPERIENCE<br />
                                <span style={{ color: '#ff5722' }}>LIFE IN INDIA</span>
                            </h2>
                        </div>
                        <Row className="g-3">
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <Col md={4} key={num}>
                                    <div className="position-relative" style={{
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                        height: '300px'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: 'rgba(0, 0, 0, 0.39)',
                                            zIndex: 1
                                        }} />
                                        <img
                                            src={`/images/student-life-${num}.jpg`}
                                            alt={`Student Life ${num}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                                            padding: '30px 20px 15px',
                                            color: 'white'
                                        }}>
                                            <h5 className="mb-2">Campus Life</h5>
                                            <p className="mb-0" style={{ fontSize: '0.9rem' }}>
                                                Experience the vibrant student life in India
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>

            {/* Footer */}
            <footer style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9f2ff 100%)', padding: '4rem 0 2rem' }}>
                <Container>
                    <Row className="mb-5">
                        <Col md={3}>
                            <img
                                src="/images/IndiaEducatesLogo.png"
                                alt="India Educates"
                                style={{ height: '60px', marginBottom: '1.5rem' }}
                            />
                            <p style={{ color: '#333', fontSize: '14px', lineHeight: '1.6', fontWeight: '500' }}>
                                <a href="https://indiaeducates.org/" target="_blank" rel="noopener noreferrer" className="text-decoration-none" style={{ color: '#ff5722', fontWeight: '500' }}> India Educates</a> is a trusted career counseling and education guidance platform dedicated to empowering students to achieve their academic and professional aspirations.
                            </p>

                        </Col>

                        <Col md={3}>
                            <h5 style={{ color: '#333', marginBottom: '1.5rem', fontWeight: '700' }}>QUICK LINKS</h5>
                            <ul className="list-unstyled">
                                <li className="mb-2"><a href="https://indiaeducates.org/" className="text-decoration-none" style={{ color: '#333', fontWeight: '500' }}>Home</a></li>
                                <li className="mb-2"><a href="https://indiaeducates.org/about-us/" className="text-decoration-none" style={{ color: '#333', fontWeight: '500' }}>About Us</a></li>
                                <li className="mb-2"><a href="https://indiaeducates.org/services/" className="text-decoration-none" style={{ color: '#333', fontWeight: '500' }}>Services</a></li>
                                <li className="mb-2"><a href="#" className="text-decoration-none" style={{ color: '#333', fontWeight: '500' }}>ICCR Scholarships</a></li>
                                <li className="mb-2"><a href="https://indiaeducates.org/contact-us/" className="text-decoration-none" style={{ color: '#333', fontWeight: '500' }}>Contact Us</a></li>
                            </ul>
                        </Col>

                        <Col md={3}>
                            <h5 style={{ color: '#333', marginBottom: '1.5rem', fontWeight: '700' }}>CONNECT WITH US!</h5>
                            <ul className="list-unstyled">
                                <li className="mb-1 d-flex align-items-start">
                                    <a href="https://www.google.com/maps/place/INDIAEDUCATES/@28.548202,77.238016,318m/data=!3m1!1e3!4m6!3m5!1s0x390ce3039ea8f47b:0xb5a270021cd73e99!8m2!3d28.548202!4d77.2380163!16s%2Fg%2F11ks6lff3x?ll=28.548202,77.238016&z=18&t=m&gl=US&mapclient=embed&cid=13088146621468196505&entry=tts&g_ep=EgoyMDI1MDExNS4wIPu8ASoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-start" style={{ color: '#333' }}>
                                        <i className="bi bi-geo-alt me-2" style={{ color: '#333' }}></i>
                                        <span style={{ color: '#333', fontWeight: '500' }}>New Delhi, India</span>
                                    </a>
                                </li>
                                <li className="mb-1">
                                    <a href="tel:+918383968877" target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-start" style={{ color: '#333' }}>
                                        <i className="bi bi-telephone me-2"></i>
                                        <span style={{ color: '#333', fontWeight: '500' }}>+91 8383968877</span>
                                    </a>
                                </li>
                                <li className="mb-1">
                                    <a href="https://wa.me/918383968877" target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-start" style={{ color: '#333' }}>
                                        <i className="bi bi-whatsapp me-2"></i>
                                        <span style={{ color: '#333', fontWeight: '500' }}>+91 8383968877</span>
                                    </a>
                                </li>
                                <li className="mb-1">
                                    <a href="mailto:info@indiaeducates.org" target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-start" style={{ color: '#333' }}>
                                        <i className="bi bi-envelope me-2"></i>
                                        <span style={{ color: '#333', fontWeight: '500' }}>info@indiaeducates.org</span>
                                    </a>
                                </li>
                            </ul>
                        </Col>

                        <Col md={3}>
                            <h5 style={{ color: '#333', marginBottom: '1.5rem', fontWeight: '700' }}>OUR OFFICE TIMINGS</h5>
                            <ul className="list-unstyled" style={{ color: '#333', fontWeight: '500' }}>
                                <li className="mb-1">Mon - Thurs : 08:00 - 13:00</li>
                                <li className="mb-1">Fri - Sat : 08:00 - 12:00</li>
                                <li className="mb-1">Sunday : Close</li>
                            </ul>
                        </Col>
                    </Row>

                    <hr style={{ margin: '2rem 0', borderColor: 'black' }} />

                    <Row>
                        <Col className="text-center" style={{ color: '#333', fontSize: '14px' }}>
                            © 2025 <a href="https://indiaeducates.org/" target="_blank" rel="noopener noreferrer" className="text-decoration-none" style={{ color: '#ff5722', fontWeight: '500' }}> India Educates</a>. All rights reserved | Deployed by
                            <a href="https://pizeonfly.com/" target="_blank" rel="noopener noreferrer" className="text-decoration-none" style={{ color: '#ff5722', fontWeight: '500' }}> PizeonFly</a>
                        </Col>
                    </Row>
                </Container>
            </footer>
            <SuccessModal />
        </>
    );
};

export default ICCR;