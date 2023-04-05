import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './style.css';

const DynamicForm = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      teamName: '',
      projectName: '',
      persons: [
        {
          fullName: '',
          birthDate: '',
          email: '',
          phoneNumber: '',
          university: '',
          studyMajor: '',
          idImage: '',
          studentidImage: ''
        },
      ],
      projectDoc: '',
      remarks: '',
      declaration:''
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'persons',
  });

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    const listMembers = data.persons;
    let Member = [];

    const uploadData = new FormData()


    listMembers.forEach((element, index) => {
      Member.push({
        FullName: element.fullName,
        BirthDate: element.birthDate,
        Email: element.email,
        Phone: element.phoneNumber,
        University: element.university,
        StudyMajor: element.studyMajor,
        //element.idImage
        //element.studentidImage
      })
      //console.log(`files.Member[${index}].StudentID`)
      //uploadData.append(`files`, element.idImage);
      //uploadData.append(`files`, element.studentidImage);
      formData.append(`files.Member[${index}].ID`, element.idImage[0]);
      formData.append(`files.Member[${index}].StudentID`, element.studentidImage[0]);
    });

    let listData = {
      "TeamName": data.teamName,
      "ProjectName": data.projectName,
      "Member": Member,
      "Remarks": data.remarks,
      "Declaration": data.declaration,
    }
    uploadData.append("files", data.projectDoc[0])
    formData.append('data', JSON.stringify(listData));
    formData.append('files.ProjectDoc', data.projectDoc[0])
/*
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:1337/api/upload',
        data: uploadData,
        headers: {},
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
*/
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:1337/api/team-responses',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      //return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }

  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1><Form.Label>Welcome to the survey app</Form.Label></h1>
      <Form.Group>
        <Form.Label>Team Name:</Form.Label>
        <Form.Control {...register(`teamName`, { required: true })} />
        {errors && errors.teamName && <Form.Text className="text-danger">Team name is required</Form.Text>}
      </Form.Group>
      <Form.Group>
        <Form.Label>Project Name:</Form.Label>
        <Form.Control {...register(`projectName`, { required: true })} />
        {errors && errors.projectName && <Form.Text className="text-danger">Project name is required</Form.Text>}
      </Form.Group>
      <div class="col-md-4">
      {fields.map((person, index) => (
        <div key={person.id}>
          <Form.Group>
            <Form.Label>Full Name:</Form.Label>
            <Form.Control {...register(`persons.${index}.fullName`, { required: true })} />
            {errors.persons && errors.persons[index] && errors.persons[index].fullName && <Form.Text className="text-danger">Full name is required</Form.Text>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Birth Date:</Form.Label> 
            <Form.Control type="date" {...register(`persons.${index}.birthDate`, { required: true })} />
            {errors.persons && errors.persons[index] && errors.persons[index].birthDate && <Form.Text className="text-danger">Birth date is required</Form.Text>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" {...register(`persons.${index}.email`, { required: true, pattern: /^\S+@\S+$/i })} />
            {errors.persons && errors.persons[index] && errors.persons[index].email && errors.persons[index].email.type === 'required' && <Form.Text className="text-danger">Email is required</Form.Text>}
            {errors.persons && errors.persons[index] && errors.persons[index].email && errors.persons[index].email.type === 'pattern' && <Form.Text className="text-danger">Invalid email format</Form.Text>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control type="tel" {...register(`persons.${index}.phoneNumber`, { required: true, pattern: /^\d{10}$/ })} />
            {errors.persons && errors.persons[index] && errors.persons[index].phoneNumber && errors.persons[index].phoneNumber.type === 'required' && <Form.Text className="text-danger">Phone number is required</Form.Text>}
            {errors.persons && errors.persons[index] && errors.persons[index].phoneNumber && errors.persons[index].phoneNumber.type === 'pattern' && <Form.Text className="text-danger">Phone number must be 10 digits</Form.Text>}
          </Form.Group>
          <Form.Group>
            <Form.Label>University:</Form.Label>
            <Form.Control {...register(`persons.${index}.university`, { required: true })} />
            {errors.persons && errors.persons[index] && errors.persons[index].university && <Form.Text className="text-danger">University/College name is required</Form.Text>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Studying Major:</Form.Label>
            <Form.Control {...register(`persons.${index}.studyMajor`, { required: true })} />
            {errors.persons && errors.persons[index] && errors.persons[index].studyMajor && <Form.Text className="text-danger">Studying major is required</Form.Text>}
          </Form.Group>
          <Form.Group>
            <Form.Label>ID Copy:</Form.Label>
            <Form.Control type="file" accept=".jpg,.jpeg,.png,.webp" {...register(`persons.${index}.idImage`, { required: true })} />
            {errors.persons && errors.persons[index] && errors.persons[index].idImage && <Form.Text className="text-danger">University/College name is required</Form.Text>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Student ID Copy:</Form.Label>
            <Form.Control type="file" accept=".jpg,.jpeg,.png,.webp" {...register(`persons.${index}.studentidImage`, { required: true })} />
            {errors.persons && errors.persons[index] && errors.persons[index].studentidImage && <Form.Text className="text-danger">University/College name is required</Form.Text>}
          </Form.Group>
          {fields.length > 1 && <Button variant="danger" type="button" onClick={() => remove(index)}>Delete Person</Button>}
        </div>
      ))}
      </div>
      <Form.Group>
        <Form.Label>Project Introduction:</Form.Label>
        <Form.Control type="file" accept=".pdf,.docx,.doc" {...register(`projectDoc`, { required: true })} />
        {errors && errors.projectDoc && <Form.Text className="text-danger">Project introduction is required</Form.Text>}
      </Form.Group>
      <Form.Group>
        <Form.Label>Remarks:</Form.Label>
        <Form.Control as="textarea" rows="5" cols="50" {...register(`remarks`)} />
      </Form.Group>
      <Form.Group>
        <Form.Check type="checkbox" label="I declare that the above information is true and correct" {...register(`declaration`, { required: true })} />
        {errors && errors.declaration && <Form.Text className="text-danger">The declaration is required</Form.Text>}
      </Form.Group>
      {fields.length < 6 && <Button variant="primary" type="button" onClick={() => append({ fullName: '', birthDate: '', email: '', phoneNumber: '', idImage: '', university: '', studyMajor: '', studentidImage: '' })}>Add Person</Button>}
      <Button variant="primary" type="submit" disabled={fields.length < 3}>Submit</Button>
      {fields.length >= 6 && <p>Maximum of 6 people reached.</p>}
    </Form>
  );
};

export default DynamicForm;
