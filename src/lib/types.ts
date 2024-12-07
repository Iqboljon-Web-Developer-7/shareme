export interface sideBarPropTypes {
  user?: {
    _id: string;
    image: string;
    userName: string;
  };
  closeToggle?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface userType {
  _id: string;
  image: string;
  userName: string;
}

export interface navbarPropTypes {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  user: userType;
}

export interface searchPropTypes {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export interface pinType {
  _id?: string;
  postedBy: string;
  image: {
    asset: {
      url: string;
    };
  };
  destination: string;
  save: pinSavedTypes[];
}
export interface pinPropTypes {
  _id?: string;
  pin: {
    postedBy: {
      _id: string;
      image: string;
      userName: string;
    };
    image: {
      asset: {
        url: string;
      };
    };
    _id: string;
    destination: string;
    save: pinSavedTypes[];
  };
}

export interface pinSavedTypes {
  postedBy: {
    _id: string;
  };
}
