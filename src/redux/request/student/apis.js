import request from '../request';
import { authHeader } from '../helper';

/**** 20200217 ****/
const GET_ALL_STUDENT = '/api/students';
const GET_STUDENT = '/api/students';
const CREATE_STUDENT = '/api/students';
const UPDATE_STUDENT = '/api/students';
const GET_ASQ_REMINDER_STUDENTS = '/api/students/asq-reminder-students';

export async function getAllStudent(action) {
  try {
    const response = await request.get(GET_ALL_STUDENT, {
      headers: {
        ...authHeader(),
      },
      params: action.params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getStudent(action) {
  try {
    const response = await request.get(`${GET_STUDENT}/${action.id}`, {
      headers: {
        ...authHeader(),
      },
      params: action.params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createStudent(action) {
  try {
    const response = await request.post(`${CREATE_STUDENT}`, action.data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateStudent(action) {
  try {
    const response = await request.put(`${UPDATE_STUDENT}/${action.id}`,action.data, {
      headers: {
        ...authHeader(),
      },
      params: action.params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getStudentsForSelection(action) {
  try {
    const response = await request.get(GET_ALL_STUDENT, {
      headers: {
        ...authHeader(),
      },
      params: action.params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAsqReminderStudents(action) {
  try {
    const response = await request.get(GET_ASQ_REMINDER_STUDENTS, {
      headers: {
        ...authHeader(),
      },
      params: action.params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
/**** 20200217 ****/

const GET_ALL_STUDENT_BY_SPECIFICATION = '/api/v1/student/findAllBySpecification';
// const GET_ALL_STUDENT = '/api/v1/student/findAllBySpecification';
const GET_STUDENT_BY_ID = '/api/v1/student/findById';
const POST_CREATE_STUDENT = '/api/v1/student';
const PUT_UPDATE_STUDENT = '/api/v1/student';
const GET_ALL_STUDENT_BY_CUSTOMER_ID = '/api/v1/student/findAllBySpecification';
const CHECK_STUDENT = '/api/v1/student/checkStudent';

export async function getAllStudentBySpecification(action) {
    try {
      const response = await request.get(GET_ALL_STUDENT_BY_SPECIFICATION, {
        headers: {
          ...authHeader(),
        },
        params: action.params,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

// export async function getAllStudent(action) {
//   try {
//     const response = await request.get(GET_ALL_STUDENT, {
//       headers: {
//         ...authHeader(),
//       },
//       params: action.params,
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }

export async function getStudentById(action) {
    try {
      const response = await request.get(`${GET_STUDENT_BY_ID}/${action.id}`, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function postCreateStudent(action) {
    try {
      const response = await request.post(POST_CREATE_STUDENT, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function putUpdateStudent(action) {
    try {
      const response = await request.put(PUT_UPDATE_STUDENT, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function getAllStudentByCustomerId(action) {
  try {
    const response = await request.get(GET_ALL_STUDENT_BY_CUSTOMER_ID, {
      headers: {
        ...authHeader(),
      },
      params: action.params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function checkStudent(action) {
  try {
    const response = await request.get(CHECK_STUDENT, {
      headers: {
        ...authHeader(),
      },
      params: action.params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}