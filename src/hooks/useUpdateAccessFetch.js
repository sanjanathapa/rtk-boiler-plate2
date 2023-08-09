import { useEffect } from "react";

import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { useLazyGetMemberDetailsByIdQuery } from "api/members/getMemberDetailsById";
import { loginStore } from "slices/loginSlice";
import { handleError } from "utils/error";
import { get } from "utils/lodash";

const useUpdateAccessFetch = () => {
  const dispatch = useDispatch();
  const [getMemberDetailsById] = useLazyGetMemberDetailsByIdQuery();

  const { user } = useSelector(
    (state) => ({
      user: get(state, "LoginSlice.user", null),
    }),
    shallowEqual
  );
  const memberId = get(user, "id", "");

  useEffect(() => {
    getMemberDetailsById({ id: memberId })
      .unwrap()
      .then((res) => {
        const authorities = get(res, "results", []);
        const accessMapping = get(authorities, "role.accessMapping", []);

        const accesses = accessMapping.map((access) => access.access.code);

        dispatch(loginStore({ accesses, skipOthers: true }));
      })
      .catch(handleError);
  }, [memberId]);
};

export default useUpdateAccessFetch;
