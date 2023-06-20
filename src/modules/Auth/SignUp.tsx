import { Divider } from 'antd';

import SignUpForm from '@/components/SignUpForm';
// import GoogleAuth from '@/components/GoogleAuth';
// import SelectRole from '@/components/SelectRole';

interface SignUpProps {
}

function SignUp({ }: SignUpProps) {
    return (
        <div>
            {/* <GoogleAuth /> */}
            <Divider>или</Divider>
            {/* TODO remove prop role, get from slice inside */}
            <SignUpForm role={1} />
        </div>
    );
}

export default SignUp;