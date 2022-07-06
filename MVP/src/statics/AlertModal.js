// Copyright Fortior Blockchain 2022
// 17 U.S.C §§ 101-1511

// import relevant dependencies.
import { useSelector, useDispatch } from "react-redux";

// JSX Component AlertModal
const AlertModal = () => {

// Starting React-dispatch to dispatch action in state in the component
  const dispatch = useDispatch();

// getting alert modal content value from redux store data
  const { openModal, modalContent } = useSelector(
    (state) => state.status.alertModal
  );

  // html building block for alert
  return (
    <menu
      className="mn_sm"
      style={{ display: `${!!openModal ? "flex" : "none"}` }}
    >
      <div className="mn_sm_modal">
        <div
          style={{
            width: "100%",
            display: "flex",
            marginRight: "10px",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              display: "flex",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "500",
              textAlign: "center",
              borderRadius: "100%",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "uppercase",
              border: "1px solid var(--l1)",
              background: "var(--main-col)",
            }}
            onClick={() => {
              dispatch({ type: "close_modal" });
            }}
          >
            <i className="uil uil-times"></i>
          </div>
        </div>

        <div
          className="mn_sm_modal_inn"
          style={{
            color : "#000",
            background : "#f2f2f2",
          }}
        >
          <>
            <div
              style={{
                minHeight: "100px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  opacity: 0.7,
                  fontWeight: "500",
                  margin: "0px 0px 20px",
                  padding: "15px 10px 15px 2px",
                  textTransform: "uppercase",
                  borderBottom: `2px solid #222`,
                }}
              >
                <i className="uil uil-exclamation-octagon"></i> Alert
              </p>
              <p
                style={{
                  opacity: 0.7,
                  textAlign: "center",
                  lineHeight: "25px",
                  marginBottom: "10px",
                }}
              >
                {modalContent}
              </p>
            </div>
          </>
        </div>
      </div>
    </menu>
  );
};

export default AlertModal;
