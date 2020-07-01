import React, { useState, useEffect } from 'react'
import { Radio, RadioGroup, TextField, FormLabel, FormGroup, FormControl, FormControlLabel, Button } from '@material-ui/core'

function Evaluation() {
    
    const [inputs, setInputs] = useState()

    const confirmDataSend = () => {
        
    }

    const onChangeHandler = (e) => {
        const {value, name} = e.target;
        setInputs({...inputs, [name]: value})
        console.log(inputs)
    }

    return(
        <div className='eval-container'>
            <FormGroup>
                <TextField name='writer' required label='필수' defaultValue='작성자' onChange={onChangeHandler}/>
                <TextField name='comment' label='의견' multiline rows={4} onChange={onChangeHandler}/>
            </FormGroup>
            <FormControl component='fieldset'>
                <FormLabel>교사 평점</FormLabel>
                <RadioGroup aria-label='점수' name='teachers' row onChange={onChangeHandler}>
                    <FormControlLabel value='1' control={<Radio />} label='1점' />
                    <FormControlLabel value='2' control={<Radio />} label='2점' />
                    <FormControlLabel value='3' control={<Radio />} label='3점' />
                    <FormControlLabel value='4' control={<Radio />} label='4점' />
                    <FormControlLabel value='5' control={<Radio />} label='5점' />
                </RadioGroup>
                <FormLabel>교육 프로그램 평점</FormLabel>
                <RadioGroup aria-label='점수' name='program' row onChange={onChangeHandler}>
                    <FormControlLabel value='1' control={<Radio />} label='1점' />
                    <FormControlLabel value='2' control={<Radio />} label='2점' />
                    <FormControlLabel value='3' control={<Radio />} label='3점' />
                    <FormControlLabel value='4' control={<Radio />} label='4점' />
                    <FormControlLabel value='5' control={<Radio />} label='5점' />
                </RadioGroup>
                <FormLabel>유치원 종합 평점</FormLabel>
                <RadioGroup aria-label='점수' name='overall' row onChange={onChangeHandler}>
                    <FormControlLabel value='1' control={<Radio />} label='1점' />
                    <FormControlLabel value='2' control={<Radio />} label='2점' />
                    <FormControlLabel value='3' control={<Radio />} label='3점' />
                    <FormControlLabel value='4' control={<Radio />} label='4점' />
                    <FormControlLabel value='5' control={<Radio />} label='5점' />
                </RadioGroup>
                <Button variant='contained' color='primary' onClick={confirmDataSend}>확인</Button>
            </FormControl>
        </div>
    )
}

export default Evaluation