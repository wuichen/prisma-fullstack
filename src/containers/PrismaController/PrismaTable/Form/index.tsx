import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, CardBody, Row, CardFooter } from 'oah-ui';
import { Inputs } from './Inputs';
import useActions from './useActions';
import { TableContext } from '../Context';
import { SchemaModel } from '../../types';

export interface FormProps {
  action: 'update' | 'create' | 'view';
  model: string;
  data: any;
  onCancel: () => void;
  onSave: () => void;
}

const getDefaultValues = (
  action: FormProps['action'],
  model: SchemaModel,
  data: any,
) => {
  const defaultValues: any = {};
  model.fields
    .filter(
      (field) =>
        (((field.update || field.read) && action !== 'create') ||
          (action === 'create' && field.create)) &&
        !field.list &&
        !field.relationField,
    )
    .slice()
    .sort((a, b) => a.order - b.order)
    .forEach((field) => {
      defaultValues[field.name] = data[field.name];
    });
  return defaultValues;
};

const Form: React.FC<FormProps> = ({
  action,
  model: modelName,
  data,
  onCancel,
  onSave,
}) => {
  const {
    schema: { models },
    formInputs,
  } = useContext(TableContext);
  const model = models.find((item) => item.id === modelName)!;
  const { onSubmit } = useActions(model, data, action, onCancel, onSave);

  const { register, errors, handleSubmit, setValue } = useForm({
    defaultValues: getDefaultValues(action, model, data),
  });

  const InputComponents = formInputs
    ? {
        ...Inputs,
        ...formInputs,
      }
    : Inputs;

  return (
    <Card
      status={action === 'update' ? 'Warning' : 'Success'}
      style={
        action === 'create'
          ? { maxWidth: '1200px', maxHeight: '100vh', minWidth: '50vw' }
          : {}
      }
    >
      <header>
        {action.charAt(0).toUpperCase() + action.slice(1) + ' ' + model.name}
      </header>
      <form onSubmit={handleSubmit(onSubmit)} style={{ overflow: 'auto' }}>
        <CardBody style={{ overflow: 'visible' }}>
          <Row between="lg">
            {model.fields
              .filter(
                (field) =>
                  ((action !== 'view' && field[action]) ||
                    (['update', 'view'].includes(action) &&
                      (field.read || field.update))) &&
                  !field.list &&
                  !field.relationField,
              )
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((field) => {
                const options = {
                  key: field.id,
                  field: field,
                  value: data[field.name],
                  error: errors[field.name],
                  register: register,
                  setValue: setValue,
                  disabled:
                    (action === 'update' && !field.update) || action === 'view',
                };
                if (field.kind === 'enum')
                  return <InputComponents.Enum {...options} />;
                if (field.kind === 'object')
                  return (
                    <InputComponents.Object
                      {...options}
                      value={data[field.name] ? data[field.name] : {}}
                    />
                  );
                if (field.editor)
                  return <InputComponents.Editor {...options} />;
                switch (field.type) {
                  case 'Boolean':
                    return <InputComponents.Boolean {...options} />;
                  case 'DateTime':
                    return <InputComponents.Date {...options} />;
                  default:
                    return <InputComponents.Default {...options} />;
                }
              })}
          </Row>
        </CardBody>
        <CardFooter>
          {action !== 'view' && (
            <Button
              style={{ marginRight: '20px' }}
              type="submit"
              status="Success"
              disabled={Object.keys(errors).length !== 0}
            >
              Save
            </Button>
          )}
          <Button type="button" status="Danger" onClick={onCancel}>
            {action !== 'view' ? 'Cancel' : 'close'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
export default Form;
