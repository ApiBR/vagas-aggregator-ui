const GetParams = (searchParams) => {
    const paramsPreset = {};
  
    if (searchParams.get("per_page")) {
      paramsPreset.per_page = parseInt(searchParams.get("per_page"));
    } else {
      paramsPreset.per_page = 100;
    }
  
    if (searchParams.get("authors")) {
      paramsPreset.authors = searchParams.get("authors");
    }
  
    if (searchParams.get("labels")) {
      paramsPreset.labels = searchParams.get("labels");
    }
  
    if (searchParams.get("organizations")) {
      paramsPreset.organizations = searchParams.get("organizations");
    }
  
    if (searchParams.get("term")) {
      paramsPreset.term = searchParams.get("term");
    }
  
    return paramsPreset;
  };

  export default GetParams;