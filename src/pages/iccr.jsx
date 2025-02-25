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
    Pen,
    TelephoneFill,
    GlobeAmericas
} from 'react-bootstrap-icons';
import axios from 'axios';

const ICCR = () => {
    


    // Add this function to handle smooth scrolling
    const scrollToApplicationForm = () => {
        const applicationForm = document.getElementById('application-form');
        if (applicationForm) {
            applicationForm.scrollIntoView({ behavior: 'smooth' });
        }
    };

   



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
                {/* Header Banner*/}

                <Row className="mb-5">
                    <Col>
                        <Card className="text-center border-0">
                            <Card.Body className="p-0" style={{
                                background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)',
                                borderRadius: '0 0 15px 15px',
                                overflow: 'hidden',
                                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)'
                            }}>
                                <Row className="g-0">
                                    <Col md={7} className="text-start p-5 d-flex flex-column justify-content-center">
                                        <div className="position-relative mb-4">
                                            <div className="position-absolute" style={{
                                                top: '-20px',
                                                left: '-30px',
                                                width: '150px',
                                                height: '150px',
                                                background: 'radial-gradient(circle, rgba(255,87,34,0.1) 0%, transparent 70%)',
                                                borderRadius: '50%'
                                            }}></div>

                                            <span className="badge bg-danger px-3 py-2 mb-3 d-inline-block" style={{
                                                fontSize: '0.9rem',
                                                fontWeight: '500',
                                                letterSpacing: '1px',
                                                borderRadius: '50px',
                                                background: 'linear-gradient(45deg, #ff5722, #ff7043) !important'
                                            }}>
                                                ICCR SCHOLARSHIP 2025
                                            </span>

                                            <h1 className="text-white mb-3 position-relative" style={{
                                                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                                                fontWeight: '800',
                                                lineHeight: '1.2',
                                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                                width: 'fit-content'
                                            }}>
                                                STUDY IN INDIA
                                                <div className="position-absolute" style={{
                                                    bottom: '-10px',
                                                    left: '0',
                                                    width: '100px',
                                                    height: '4px',
                                                    background: 'linear-gradient(90deg, #ff5722, transparent)',
                                                    borderRadius: '2px'
                                                }}></div>
                                                <div className="position-absolute" style={{
                                                    bottom: '-10px',
                                                    right: '0',
                                                    width: '100px',
                                                    height: '4px',
                                                    background: 'linear-gradient(270deg, #28a745, transparent)', // Changed color and direction
                                                    borderRadius: '2px'
                                                }}></div>
                                            </h1>

                                            <h2 className="text-white-50 mb-4" style={{
                                                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                                                fontWeight: '600',
                                                letterSpacing: '0.5px'
                                            }}>
                                                Avail Fully Funded Scholarship Program
                                            </h2>
                                        </div>

                                        <div className="mb-4" style={{
                                            width: '60rem',
                                            backgroundColor: '#28a745',
                                            padding: '10px',
                                            borderRadius: '10px',
                                        }}>
                                            <h3 style={{
                                                color: 'white',
                                                fontSize: '1.8rem',
                                                fontWeight: '700',
                                                marginBottom: '10px',
                                            }}>
                                                Get up to <span style={{ color: '#d52637' }}>250-300 US Dollar</span> every month stipend
                                            </h3>
                                            <h4 style={{
                                                color: 'white',
                                                fontSize: '1.4rem',
                                                fontWeight: '600'
                                            }}>
                                                Register now at just <span style={{ color: '#d52637', fontWeight: '700' }}>65$</span>
                                            </h4>
                                        </div>

                                        <div className="d-flex flex-wrap gap-3 mb-4">
                                            <Button
                                                className="px-5 py-3 d-flex align-items-center"
                                                style={{
                                                    backgroundColor: '#ff5722',
                                                    border: 'none',
                                                    borderRadius: '50px',
                                                    fontSize: '1.2rem',
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
                                        </div>

                                        <div className="d-flex flex-wrap gap-3">
                                            <div className="d-flex align-items-center bg-white bg-opacity-10 p-3 rounded-3">
                                                <div className="bg-white p-2 rounded-circle me-3">
                                                    <TelephoneFill style={{ width: '24px', height: '24px', color: '#198754' }} />
                                                </div>
                                                <div>
                                                    <small className="text-white-50 d-block">Call Us</small>
                                                    <span className="text-white" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                                                        +91-9821694911
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center bg-white bg-opacity-10 p-3 rounded-3">
                                                <div className="bg-white p-2 rounded-circle me-3">
                                                    <GlobeAmericas style={{ width: '24px', height: '24px', color: '#198754' }} />
                                                </div>
                                                <div>
                                                    <small className="text-white-50 d-block">Visit Us</small>
                                                    <span className="text-white" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                                                        indiaeducates.co
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={5} className="position-relative">
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            // background: 'linear-gradient(45deg, rgba(26,26,26,0.8) 0%, transparent 100%)',
                                            zIndex: 1
                                        }}></div>
                                        <img
                                            src="/images/iccr.png"
                                            alt="Student"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                objectPosition: 'center'
                                            }}
                                        />
                                    </Col>
                                </Row>
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
                                        src="/images/documents.jpeg"
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
                                        src="/images/general-info.png"
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
            
        </>
    );
};

export default ICCR;