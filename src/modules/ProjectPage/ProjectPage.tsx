import { ProjectPageHttp, Role, UpdateProjectPage, UserHttp } from "@/__generated__/graphql";
import { PRODUCTION, PROFILE_PAGE_ROUTE } from "@/consts";
import { UPDATE_PROJECT_PAGE } from "@/graphql/mutations";
import { GET_PROJECT_PAGE_BY_ID, GET_USER_BY_ID } from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Skeleton, Switch, notification } from "antd";
import { useNavigate } from "react-router-dom";

interface ProjectPageModuleProps {
    id: string;
}

interface ProjectPageFormInput {
    title: string;
    notes: string;
    isShared: boolean;
    instruction: string;
}

function ProjectPageModule({ id }: ProjectPageModuleProps) {
    const [form] = Form.useForm()
    const getProjectPage = useQuery<{ GetProjectPageById: ProjectPageHttp }, { id: string }>(
        GET_PROJECT_PAGE_BY_ID,
        {
            onError: error => {
                notification.error({
                    message: 'Ошибка',
                    description: error?.message,
                })
            },
            variables: {
                id: id
            }
        }
    );
    const getUser = useQuery<{ GetUserById: UserHttp }, { id: string }>(
        GET_USER_BY_ID,
        {
            onError: error => {
                notification.error({
                    message: 'Ошибка',
                    description: error?.message,
                })
            },
            skip: !getProjectPage.data?.GetProjectPageById.authorId,
            variables: {
                id: getProjectPage.data?.GetProjectPageById.authorId || '0'
            }
        }
    );
    const [updateProjectPage, updateProjectPageResult] = useMutation<{ UpdateProjectPage: ProjectPageHttp }, { input: UpdateProjectPage }>(
        UPDATE_PROJECT_PAGE,
        {
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Страница проекта обновлена.',
                })
            },
            onError: error => {
                notification.error({
                    message: 'Ошибка',
                    description: error?.message,
                })
            },
            refetchQueries: [
                {
                    query: GET_PROJECT_PAGE_BY_ID,
                    variables: {
                        id: id
                    }
                },
            ],
        }
    );
    const navigate = useNavigate();
    const openProfileUser = (userId: string, role: Role): void => {
        navigate(PROFILE_PAGE_ROUTE, {
            state: {
                userId,
                userRole: role,
            },
        })
        return
    };
    const seeInsideHandler = () => {
        window.location.replace(process.env.MODE === PRODUCTION ? 'http://92.255.79.9/scratch' + `?#${getProjectPage.data?.GetProjectPageById.id}` : 'http://localhost:8601/' + `?#${getProjectPage.data?.GetProjectPageById.id}`)
    }
    return (
        getProjectPage.loading || getUser.loading ? (
            <Skeleton avatar paragraph={{ rows: 8 }} />) :
            (
                <Form
                    name='project-page'
                    className='project-page-form'
                    labelWrap
                    form={form}
                    initialValues={{
                        title: getProjectPage.data?.GetProjectPageById.title,
                        instruction: getProjectPage.data?.GetProjectPageById.instruction,
                        notes: getProjectPage.data?.GetProjectPageById.notes,
                        isShared: getProjectPage.data?.GetProjectPageById.isShared,
                    }}
                    onFinish={({ title, instruction, notes, isShared }: ProjectPageFormInput) => {
                        console.log(isShared)
                        updateProjectPage({
                            variables: {
                                input: {
                                    id: id,
                                    title: title,
                                    instruction: instruction,
                                    notes: notes,
                                    isShared: isShared,
                                }
                            }
                        })
                    }}
                >
                    <Form.Item name='title'>
                        <Input size='large' placeholder={'Название'} />
                    </Form.Item>
                    <Form.Item name='instruction'>
                        <Input.TextArea size='large' rows={4} placeholder={'Инструкция'} />
                    </Form.Item>
                    <Form.Item name='notes'>
                        <Input.TextArea size='large' rows={4} placeholder='Заметки' />
                    </Form.Item>
                    <Form.Item label={'Автор'}>
                        <a onClick={() => openProfileUser(getUser.data?.GetUserById.id || '0', getUser.data?.GetUserById.role || Role.Anonymous)}>{`${getUser.data?.GetUserById.lastname} ${getUser.data?.GetUserById.firstname} ${getUser.data?.GetUserById.middlename}`}</a>
                    </Form.Item>
                    <Form.Item label={'Создан'}>
                        {getProjectPage.data?.GetProjectPageById.createdAt}
                    </Form.Item>
                    <Form.Item label={'Последнее изменение страницы проекта'}>
                        {getProjectPage.data?.GetProjectPageById.updatedAt}
                    </Form.Item>
                    <Form.Item label='Последнее изменение проекта'>
                        {getProjectPage.data?.GetProjectPageById.projectUpdatedAt}
                    </Form.Item>
                    <Form.Item
                        name='isShared'
                        label={'Открыть доступ'}
                        valuePropName='checked'
                    >
                        <Switch />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            loading={getProjectPage.loading || updateProjectPageResult.loading}
                            type='primary'
                            htmlType='submit'
                            className='project-page-form-button'
                        >
                            Сохранить
                        </Button>
                    </Form.Item>
                    <Button
                        type='primary' onClick={seeInsideHandler}
                    >
                        Открыть в Robbo Scratch
                    </Button>
                </Form>
            )
    );
}

export default ProjectPageModule;