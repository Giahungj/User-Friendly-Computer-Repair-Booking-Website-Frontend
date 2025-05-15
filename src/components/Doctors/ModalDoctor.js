import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

const ModalDoctor = (props) => {
    const { dataDoctor } = props;
    console.log("check data doctor: ", dataDoctor)

    //-----------------------------------------------------------
    useEffect(() => {

    }, [dataDoctor])

    //-----------------------------------------------------------
    return (
        <>
            <Modal size="lg" show={props.show} onHide={props.handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>Đặt lịch</span>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label>Họ tên:  (<span className="text-danger">*</span>):</label>
                            <input type="text" className="form-control"
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>Ngày khám:</label>
                            <input type="date" className="form-control"
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>Bác sĩ:</label>

                            <input type="text" className="form-control" value={dataDoctor.User ? dataDoctor.User.name : "zzz"} readOnly
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>Giờ khám: (<span className="text-danger">*</span>):</label>
                            <select
                                className="form-select"
                            >
                                <option value={"1"} >1</option>
                                <option value={"1"} >2</option>
                                <option value={"1"} >3</option>

                            </select>
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>Giá:</label>
                            <input type="text" className="form-control" value={dataDoctor.User ? dataDoctor.price : "0"} readOnly
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Cơ sở y tế:</label>
                            <input type="text" className="form-control"
                                value={dataDoctor.Facility ? dataDoctor.Facility.name : "###########"} readOnly
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Chuyên khoa:</label>
                            <input type="text" className="form-control" value={dataDoctor.Specialty ? dataDoctor.Specialty.name : "###########"} readOnly
                            />
                        </div>

                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={props.handleCloseModal}
                    >Close</Button>
                    <Button variant="primary">
                        submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDoctor;