import React, { memo } from "react";
import styled from "styled-components";
import Flex from "./Flex";

const InputWrapper = styled.div`
  position: relative;
  width: ${({ width }) => width || ""};

  .input {
    width: ${({ width }) => width || ""};
    padding: 3px;
    outline: none;
    border-radius: 5px;
    border: 1px solid black;

    &__error {
      border-color: red;
    }
  }
`;

const TownList = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 3px;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid black;
  background-color: white;

  .input__option {
    cursor: pointer;
    &:hover {
      background-color: #dfdada;
    }
  }
`;

function InputWrap(props) {
  return <InputWrapper {...props}>{props.children}</InputWrapper>;
}

function Input({
  value,
  townOptions,
  changeByEnter,
  handleChange,
  showError,
  width,
}) {
  console.log(showError);

  const inputClass = showError ? "input input__error" : "input";

  return (
    <InputWrap width={width}>
      <Flex direction="column">
        <input
          autoFocus="autofocus"
          className={inputClass}
          type="text"
          placeholder="Enter new city name"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => changeByEnter(e)}
        />
        {!!townOptions.length && (
          <TownList>
            {townOptions.map((item, index) => (
              <p
                className="input__option"
                onClick={() => handleChange(item, "clear")}
                key={index}
              >
                {item}
              </p>
            ))}
          </TownList>
        )}
      </Flex>
    </InputWrap>
  );
}

export default memo(Input);
