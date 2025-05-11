'use client'
import {InputProps} from "./Input.props";
import cn from "classnames";
import styles from "./Input.module.css"
import {useEffect, useState} from "react";
import Eye from "./eye.svg"

export const Input = ({
                          name,
                          state = "default",
                          value,
                          type,
                          id,
                          placeholder,
                          onChange,
                          className,
                          ...props
                      }: InputProps): JSX.Element => {

    const [inputValue, setInputValue] = useState(value || "");
    const [isFilled, setIsFilled] = useState(!!value);


    useEffect(() => {
        setInputValue(value || "");
        setIsFilled(!!value);
    }, [value]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        if (onChange) {
            onChange(event);
        }
    };


    const handleBlur = () => {
        setIsFilled(inputValue !== "");
    };

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };


    return (<div className={styles.inputContainer}>
        <input id={id} className={cn(styles.input, {
            [styles.success]: isFilled || state === "success" && type != "password",
            [styles.successPassword]: isFilled || state === "success" && type == "password",
            [styles.error]: state == "error" && type != "password",
            [styles.errorPassword]: state == "error" && type == "password",
            [styles.disable]: state == "disable"
        })}
               readOnly={state == "disable"}
               placeholder={placeholder}
               type={showPassword ? "text" : type}
               value={inputValue}
               onChange={handleInputChange}
               onBlur={handleBlur}
        />
        {type === "password" ?
            <Eye className={cn(styles.eyeIcon)} onClick={togglePasswordVisibility}/> : null
        }
    </div>);
};
