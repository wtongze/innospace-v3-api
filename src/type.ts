export interface CreateUserRequestBody {
  token: string;
  name: string;
  description?: string;
  resume?: string;
  email: string;
  mobile_phone_number?: string;
  skills: string[];
  interested_tags: string[];
  interested_fields: string[];
}

export interface ReadUserRequestBody {
  token: string;
}

export interface UpdateUserRequestBody {
  token: string;
  name: string;
  description?: string;
  resume?: string;
  email: string;
  mobile_phone_number?: string;
  skills: string[];
  interested_tags: string[];
  interested_fields: string[];
}

export interface DeleteUserRequestBody {
  token: string;
}

export interface CreateProjectRequestBody {
  token: string;
  id: string;
  name: string;
  logo?: string;
  description: string;
  tags: string[];
  fields: string[];
  website?: string;
  owner: string;
  contact_name: string;
  contact_email: string;
  visible: boolean;
}

export interface ReadProjectRequestBody {
  token: string;
}

export interface UpdateProjectRequestBody {
  token: string;
  name: string;
  logo?: string;
  description: string;
  tags: string[];
  fields: string[];
  website?: string;
  owner: string;
  contact_name: string;
  contact_email: string;
  visible: boolean;
}

export interface DeleteProjectRequestBody {
  token: string;
}

export interface CreatePositionRequestBody {
  token: string;
  title: string;
  type: string;
  description: string;
  requirement: string;
  preference: string;
  skills: string[];
  project: string;
  visible: boolean;
}

export interface ReadProjectRequestBody {
  token: string;
}

export interface UpdatePositionRequestBody {
  token: string;
  title: string;
  type: string;
  description: string;
  requirement: string;
  preference: string;
  skills: string[];
  visible: boolean;
}

export interface DeletePositionRequestBody {
  token: string;
}

export interface CreateApplicationRequestBody {
  token: string;
  project: string;
  position: number;
  name: string;
  email: string;
  mobile_phone_number: string;
  resume: string;
  type: string;
}

export interface ReadApplicationRequestBody {
  token: string;
}

export interface UpdateApplicationRequestBody {
  token: string;
  name: string;
  email: string;
  mobile_phone_number: string;
  resume: string;
  status: string;
  type: string;
}

export interface DeleteApplicationRequestBody {
  token: string;
}
